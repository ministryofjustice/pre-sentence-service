import BaseController from './baseController'
import { Request, Response } from 'express'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { editOffencesModel } from '../../schemas/edit-offences'
import { ensureStoredOffences, splitOffenceLines } from '../../utils/offenceDetails'

export const pageFields: Array<string> = ['mainOffence', 'additionalOffences']

export default class EditOffencesController extends BaseController {
  override templatePath = 'edit-offences'

  override redirectPath = 'offence-analysis'

  override pageFields = pageFields

  override model = editOffencesModel

  override persistOnValidationFailure = false

  constructor(
    reportService: import('../../services/reportService').default,
    preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {
    super(reportService, preSentenceToDeliusService)
  }

  override correctFormData = (req: Request) => ({
    mainOffence: typeof req.body.mainOffence === 'string' ? req.body.mainOffence.trim() : '',
    additionalOffences: splitOffenceLines(req.body.additionalOffences).join('\n'),
  })

  protected override async beforeRender(req: Request<{ reportId: string }>, _res: Response): Promise<void> {
    const offences = await ensureStoredOffences(
      this.data,
      req.params.reportId,
      this.reportService,
      this.preSentenceToDeliusService
    )

    if (offences) {
      this.data = {
        ...this.data,
        mainOffence: offences.mainOffence,
        additionalOffences: offences.additionalOffences.join('\n'),
      }
    }
  }
}
