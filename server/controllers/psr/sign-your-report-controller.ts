import BaseController from './baseController'
import * as z from 'zod'
import { Request, Response } from 'express'
import { validateForm } from '../../utils/formValidation'
import { areReviewSectionsComplete, getReportProgress } from '../../utils/reportProgress'

export const signYourReportModel = z
  .object({
    signReportName: z.string().min(1, 'You must sign your report before you submit'),

    isDangerousReport: z.string().min(1, 'Specify whether this is a dangerousness report'),

    spoName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isDangerousReport === 'yes' && !data.spoName?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['spoName'],
        message: 'Enter the name of the SPO who reviewed the report',
      })
    }
  })
export const pageFields: Array<string> = ['signReportName', 'isDangerousReport', 'spoName']

export default class SignYourReportController extends BaseController {
  override templatePath = 'sign-your-report'

  override redirectPath = 'submit-completed'

  override model = signYourReportModel

  override pageFields = pageFields
  override correctFormData = (req: Request) => {
    const elementsWithError: string[] = []

    if (!req.body.isDangerousReport) {
      elementsWithError.push('isDangerousReport')
    }
    if (req.body.isDangerousReport === 'yes' && !req.body.spoName) {
      elementsWithError.push('spoName')
    }
    return { elementsWithError }
  }

  private getSavedAnswers = () => {
    const data: Record<string, unknown> = {}

    this.report.pages?.forEach(page => {
      page.questions.forEach(question => {
        data[question.value] = question.answer
      })
    })

    return data
  }

  private getSignPagePersistentData = () => {
    const data: Record<string, unknown> = {
      crn: this.report.person.crn,
      name: `${this.report.person.names.foreName} ${this.report.person.names.surname}`,
      dateOfBirth: this.report.person.dateOfBirth,
    }

    if (this.report.person.address) {
      data['address-buildingName'] = this.report.person.address.buildingNumber || ''
      data['address-number'] = this.report.person.address.addressNumber || ''
      data['address-streetName'] = this.report.person.address.streetName || ''
      data['address-town'] = this.report.person.address.town || ''
      data['address-district'] = this.report.person.address.district || ''
      data['address-county'] = this.report.person.address.county || ''
      data['address-postcode'] = this.report.person.address.postcode || ''
    }

    return data
  }

  override post = async (req: Request, res: Response): Promise<void> => {
    if (req.query?.redirectPath) {
      await super.post(req, res)
      return
    }

    const reportId = req.params.reportId
    const rep = await this.reportService.getReportById(reportId)

    if (!rep) {
      res.redirect(`/${this.path}/${reportId}/not-found`)
      return
    }

    this.report = rep

    const validatedForm = validateForm(req.body, this.model)
    if (!validatedForm.isValid) {
      await super.post(req, res)
      return
    }

    req.body = {
      ...req.body,
      ...this.correctFormData(req),
    }

    const data = {
      ...this.defaultTemplateData,
      ...this.getSavedAnswers(),
      ...this.report,
      ...this.getSignPagePersistentData(),
      ...req.body,
    }
    const sectionStatuses = getReportProgress(data)

    if (!areReviewSectionsComplete(sectionStatuses)) {
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId,
        data: {
          ...data,
          reviewProgressBlocked: true,
          sectionStatuses,
        },
        formValidation: {
          isValid: false,
          errors: {
            reviewProgress: 'Complete all sections in Review your progress before signing and locking this report',
          },
        },
      })
      return
    }

    await this.updateReportActions(req)
    res.redirect(`/${this.path}/${reportId}/${this.redirectPath}`)
  }
}
