import BaseController from './baseController'
import * as z from 'zod'
import { Request, Response } from 'express'
import { validateForm } from '../../utils/formValidation'
import { areReviewSectionsComplete, getReportProgress } from '../../utils/reportProgress'
import EventService from '../../services/eventService'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { transformDefendantDetails } from '../../utils/apiDataTransformers'
import logger from '../../../logger'
import config from '../../config'

export const signYourReportModel = z
  .object({
    signReportName: z.string().min(1, 'You must sign your report before you submit'),

    isDangerousReport: z.preprocess(
      val => val ?? '',
      z.string().min(1, 'Specify whether this is a dangerousness report')
    ),
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

  override redirectPath = 'publish-report'

  override model = signYourReportModel

  override pageFields = pageFields

  private eventService?: EventService

  constructor(
    reportService: ReportService,
    preSentenceToDeliusService?: PreSentenceToDeliusService,
    eventService?: EventService
  ) {
    super(reportService, preSentenceToDeliusService)
    this.eventService = eventService
  }

  override correctFormData = (req: Request) => {
    const elementsWithError: string[] = []

    if (!req.body.isDangerousReport) {
      elementsWithError.push('isDangerousReport')
    }
    if (req.body.isDangerousReport === 'yes' && !req.body.spoName?.trim()) {
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

  private fetchApiDefendantData = async (reportId: string): Promise<Record<string, unknown>> => {
    if (!this.preSentenceToDeliusService) {
      return { crn: this.report.person.crn, apiDefendantDetailsAvailable: false }
    }
    try {
      const apiData = await this.preSentenceToDeliusService.getDefendantDetails(reportId)
      return { ...transformDefendantDetails(apiData), apiDefendantDetailsAvailable: true }
    } catch (error) {
      logger.warn({ reportId, error }, 'Failed to fetch defendant details from Pre-Sentence to Delius API')
      return { crn: this.report.person.crn, apiDefendantDetailsAvailable: false }
    }
  }

  override post = async (req: Request, res: Response): Promise<void> => {
    const reportId = req.params.reportId
    const username = res.locals?.user?.username || 'system'

    logger.info('Sign and lock report request initiated', {
      reportId,
      username,
      hasRedirectPath: !!req.query?.redirectPath,
    })

    if (req.query?.redirectPath) {
      logger.info('Delegating to super.post due to redirectPath', { reportId })
      await super.post(req, res)
      return
    }

    logger.info('Fetching report for signing', { reportId })
    const rep = await this.reportService.getReportById(reportId)

    if (!rep) {
      logger.warn('Report not found for signing', { reportId })
      res.redirect(`/${this.path}/${reportId}/not-found`)
      return
    }

    logger.info('Report retrieved successfully', {
      reportId,
      reportStatus: rep.status,
      hasPerson: !!rep.person,
      crn: rep.person?.crn,
    })

    this.report = rep

    const validatedForm = validateForm(req.body, this.model)
    if (!validatedForm.isValid) {
      logger.warn('Form validation failed for sign and lock', {
        reportId,
        errors: validatedForm.errors,
      })
      await super.post(req, res)
      return
    }

    logger.info('Form validation successful', {
      reportId,
      signReportName: req.body.signReportName,
      isDangerousReport: req.body.isDangerousReport,
    })

    req.body = {
      ...req.body,
      ...this.correctFormData(req),
    }

    logger.info('Building report data for progress check', { reportId })
    const apiDefendantData = await this.fetchApiDefendantData(reportId)
    const data = {
      ...this.defaultTemplateData,
      ...this.getSavedAnswers(),
      ...this.report,
      ...apiDefendantData,
      ...req.body,
    }
    const sectionStatuses = getReportProgress(data)

    logger.info('Report progress calculated', {
      reportId,
      sectionStatuses,
      allSectionsComplete: areReviewSectionsComplete(sectionStatuses),
    })

    if (!areReviewSectionsComplete(sectionStatuses)) {
      logger.warn('Report sections incomplete, cannot sign and lock', {
        reportId,
        sectionStatuses,
      })
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

    logger.info('All report sections complete, proceeding to sign and lock', { reportId })

    logger.info('Updating report actions (signing and locking)', { reportId })
    try {
      await this.updateReportActions(req)
      logger.info('Report actions updated successfully', { reportId })
    } catch (error) {
      logger.error('Failed to update report actions', {
        reportId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      })
      throw error
    }

    // Publish domain event for report created
    if (this.eventService && this.report) {
      logger.info('Preparing to publish PSR created domain event', {
        reportId: this.report.id,
        crn: this.report.person.crn,
        hasEventService: !!this.eventService,
      })

      try {
        logger.info('Publishing PSR created domain event', {
          reportId: this.report.id,
          crn: this.report.person.crn,
          username,
          reportStatus: 'created',
          eventType: 'pre-sentence.report.created',
        })

        await this.eventService.sendReportEvent({
          reportId: this.report.id!,
          eventNumber: this.report.id!, // Using reportId as eventNumber
          crn: this.report.person.crn,
          reportStatus: 'created',
          username,
          pdfUrl: `${config.domain}/api/v1/report/${this.report.id}/pdf`,
        })

        logger.info('PSR created domain event published successfully', {
          reportId: this.report.id,
          crn: this.report.person.crn,
          username,
        })
      } catch (error) {
        logger.error('Failed to publish PSR created domain event', {
          reportId: this.report.id,
          crn: this.report.person.crn,
          username,
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          errorType: error?.constructor?.name,
        })
        // Don't fail the request if domain event publishing fails
      }
    } else {
      logger.warn('Domain event not published - service or report missing', {
        reportId,
        hasEventService: !!this.eventService,
        hasReport: !!this.report,
      })
    }

    logger.info('Redirecting to publish report page', {
      reportId,
      redirectPath: this.redirectPath,
    })
    res.redirect(`/${this.path}/${reportId}/${this.redirectPath}`)
  }
}
