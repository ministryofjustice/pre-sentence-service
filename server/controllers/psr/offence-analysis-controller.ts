import BaseController from './baseController'
import { Request, Response } from 'express'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { transformOffenceDetails } from '../../utils/apiDataTransformers'
import { offenceAnalysisModel } from '../../schemas/offence-analysis'
import logger from '../../../logger'

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern', 'noPreviousOffences']

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

  protected override async beforeRender(req: Request, _res: Response): Promise<void> {
    const reportId = req.params.reportId

    if (this.preSentenceToDeliusService && reportId && this.report) {
      try {
        logger.info({ reportId }, 'Fetching offence details from Pre-Sentence to Delius API')
        const apiData = await this.preSentenceToDeliusService.getOffences(reportId)

        const transformedOffences = transformOffenceDetails(apiData)

        this.data = {
          ...this.data,
          offencesData: transformedOffences,
          apiOffencesAvailable: true,
        }

        logger.info({ reportId }, 'Successfully fetched offence details from API')
      } catch (error) {
        logger.warn({ reportId, error }, 'Failed to fetch offence details from API, using database data')
        this.data = {
          ...this.data,
          apiOffencesAvailable: false,
        }
      }
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    const body = req.body as Record<string, string>

    if (!('noPreviousOffences' in body)) {
      body.noPreviousOffences = 'false'
    }

    await super.post(req, res)
  }
}
