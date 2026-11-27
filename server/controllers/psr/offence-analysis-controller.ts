import BaseController from './baseController'
import { Request, Response } from 'express'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { toOffencesViewModel } from '../../utils/apiDataTransformers'
import { ensureStoredOffences } from '../../utils/offenceSnapshot'
import { offenceAnalysisModel } from '../../schemas/offence-analysis'
import logger from '../../../logger'

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
    const reportId = req.params.reportId

    if (reportId && this.report) {
      const offences = await ensureStoredOffences(this.report, this.reportService, this.preSentenceToDeliusService)

      if (offences) {
        this.data = {
          ...this.data,
          offencesData: toOffencesViewModel(offences),
          offencesAvailable: true,
        }
      } else {
        logger.warn({ reportId }, 'Offences not available for offence analysis page')
        this.data = {
          ...this.data,
          offencesAvailable: false,
        }
      }
    }
  }
}
