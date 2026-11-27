import BaseController from './baseController'
import { Request, Response } from 'express'
import { ensureStoredOffences } from '../../utils/offenceSnapshot'
import { editOffencesModel } from '../../schemas/edit-offences'
import { validateForm } from '../../utils/formValidation'
import { ReportOffence, ReportOffences } from '../../@types/reportOffences'

interface EditOffencesRow {
  description: string
  date: string
  code: string
}

interface EditOffencesViewModel {
  mainOffenceDescription: string
  mainOffenceDate: string
  mainOffenceCode: string
  additionalOffences: EditOffencesRow[]
}

const toArray = (value: unknown): string[] => {
  if (value === undefined || value === null) return []
  if (Array.isArray(value)) return value.map(entry => String(entry))
  return [String(value)]
}

const toEditOffencesViewModel = (offences: ReportOffences): EditOffencesViewModel => ({
  mainOffenceDescription: offences.mainOffence.description ?? '',
  mainOffenceDate: offences.mainOffence.date ?? '',
  mainOffenceCode: offences.mainOffence.code ?? '',
  additionalOffences: (offences.additionalOffences ?? []).map(offence => ({
    description: offence.description ?? '',
    date: offence.date ?? '',
    code: offence.code ?? '',
  })),
})

const buildEditOffencesFromBody = (body: Record<string, unknown>): EditOffencesViewModel => {
  const descriptions = toArray(body.additionalOffenceDescription)
  const dates = toArray(body.additionalOffenceDate)
  const codes = toArray(body.additionalOffenceCode)

  const additionalOffences = descriptions.map((description, index) => ({
    description,
    date: dates[index] ?? '',
    code: codes[index] ?? '',
  }))

  return {
    mainOffenceDescription: typeof body.mainOffenceDescription === 'string' ? body.mainOffenceDescription : '',
    mainOffenceDate: typeof body.mainOffenceDate === 'string' ? body.mainOffenceDate : '',
    mainOffenceCode: typeof body.mainOffenceCode === 'string' ? body.mainOffenceCode : '',
    additionalOffences,
  }
}

const buildOffence = (description: string, date: string, code: string): ReportOffence => ({
  description,
  ...(date.trim() !== '' && { date }),
  ...(code.trim() !== '' && { code }),
})

const buildReportOffencesFromBody = (body: Record<string, unknown>): ReportOffences => {
  const descriptions = toArray(body.additionalOffenceDescription)
  const dates = toArray(body.additionalOffenceDate)
  const codes = toArray(body.additionalOffenceCode)

  const additionalOffences: ReportOffence[] = descriptions
    .map(description => description.trim())
    .map((description, index) => buildOffence(description, dates[index] ?? '', codes[index] ?? ''))
    .filter(offence => offence.description !== '')

  const mainOffenceDescription = typeof body.mainOffenceDescription === 'string' ? body.mainOffenceDescription : ''
  const mainOffenceDate = typeof body.mainOffenceDate === 'string' ? body.mainOffenceDate : ''
  const mainOffenceCode = typeof body.mainOffenceCode === 'string' ? body.mainOffenceCode : ''

  return {
    mainOffence: buildOffence(mainOffenceDescription.trim(), mainOffenceDate, mainOffenceCode),
    additionalOffences,
  }
}

export default class EditOffencesController extends BaseController {
  override templatePath = 'edit-offences'

  override redirectPath = 'offence-analysis'

  override model = editOffencesModel

  protected override async beforeRender(req: Request<{ reportId: string }>, _res: Response): Promise<void> {
    const reportId = req.params.reportId

    if (reportId && this.report) {
      const offences = await ensureStoredOffences(this.report, this.reportService, this.preSentenceToDeliusService)

      if (offences) {
        this.data = {
          ...this.data,
          editOffences: toEditOffencesViewModel(offences),
          offencesAvailable: true,
        }
      } else {
        this.data = {
          ...this.data,
          offencesAvailable: false,
        }
      }
    }
  }

  public override async post(req: Request<{ reportId: string }>, res: Response): Promise<void> {
    const reportId = req.params.reportId

    const report = await this.reportService.getReportById(reportId)
    if (!report) {
      res.redirect(`/${this.path}/${reportId}/not-found`)
      return
    }
    this.report = report

    const removeOffenceRaw = req.body.removeOffence
    const action = req.body.action

    if (removeOffenceRaw !== undefined) {
      const removeIndex = Number(removeOffenceRaw)
      const editOffences = buildEditOffencesFromBody(req.body)

      if (Number.isInteger(removeIndex) && removeIndex >= 0 && removeIndex < editOffences.additionalOffences.length) {
        editOffences.additionalOffences = editOffences.additionalOffences.filter((_, index) => index !== removeIndex)
      }

      await this.rerender(req, res, editOffences)
      return
    }

    if (action === 'addOffence') {
      const editOffences = buildEditOffencesFromBody(req.body)
      editOffences.additionalOffences = [...editOffences.additionalOffences, { description: '', date: '', code: '' }]

      await this.rerender(req, res, editOffences)
      return
    }

    const validatedForm = validateForm(req.body, this.model)

    if (validatedForm.isValid && report.offences) {
      const offences = buildReportOffencesFromBody(req.body)
      await this.reportService.updateReportOffences(reportId, offences)
      res.redirect(`/${this.path}/${reportId}/${this.redirectPath}`)
      return
    }

    const editOffences = buildEditOffencesFromBody(req.body)

    await this.fetchDefendantDetails(reportId)

    this.renderTemplate(res, {
      ...this.templateValues,
      reportId,
      data: {
        ...this.report,
        ...this.data,
        editOffences,
        offencesAvailable: Boolean(report.offences),
      },
      formValidation: {
        isValid: validatedForm.isValid,
        errors: validatedForm.errors,
      },
    })
  }

  private async rerender(
    req: Request<{ reportId: string }>,
    res: Response,
    editOffences: EditOffencesViewModel
  ): Promise<void> {
    const reportId = req.params.reportId

    await this.fetchDefendantDetails(reportId)

    this.renderTemplate(res, {
      ...this.templateValues,
      reportId,
      data: {
        ...this.report,
        ...this.data,
        editOffences,
        offencesAvailable: true,
      },
    })
  }
}
