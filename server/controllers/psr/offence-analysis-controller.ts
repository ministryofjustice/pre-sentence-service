import BaseController from './baseController'
import { Request, Response } from 'express'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { offenceAnalysisModel } from '../../schemas/offence-analysis'
import { ensureStoredOffences } from '../../utils/offenceDetails'

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'defendant-behaviour'

  override pageFields = pageFields

  override model = offenceAnalysisModel

  constructor(
    reportService: import('../../services/reportService').default,
    preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {
    super(reportService, preSentenceToDeliusService)
  }

  protected override async beforeRender(req: Request<{ reportId: string }>, _res: Response): Promise<void> {
    const offences = await ensureStoredOffences(
      this.data,
      req.params.reportId,
      this.reportService,
      this.preSentenceToDeliusService
    )

    this.data = {
      ...this.data,
      offences,
      offencesAvailable: Boolean(offences),
    }
  }
}
