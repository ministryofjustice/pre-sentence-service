import BaseController from './baseController'
import { Request, Response } from 'express'
import * as z from 'zod'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { transformOffenceDetails } from '../../utils/apiDataTransformers'
import { longText } from '../../utils/validation'
import logger from '../../../logger'

const offenceAnalysisModel = z
  .object({
    pnc: z.string().optional(),
    offencesUnderConsideration: longText({ label: 'Offences under consideration' }),
    offencesPattern: longText({ label: 'Pattern of offending' }),
    noPreviousOffences: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const offencesPatternEmpty = data.offencesPattern.trim() === ''
    const noPreviousOffences = data.noPreviousOffences ?? ''
    const noPreviousOffencesEmpty = noPreviousOffences.trim() === '' || noPreviousOffences.trim() === 'false'

    if (data.offencesUnderConsideration.trim() === '') {
      ctx.addIssue({
        code: 'custom',
        message: 'Analyse the offences under consideration',
        path: ['offencesUnderConsideration'],
      })
    }

    if (offencesPatternEmpty && noPreviousOffencesEmpty) {
      ctx.addIssue({
        code: 'custom',
        message: 'Analyse the pattern of offending and response to supervision',
        path: ['offencesPattern'],
      })

      ctx.addIssue({
        code: 'custom',
        message: 'Check the box if the defendant has no previous offences or experience of supervision',
        path: ['noPreviousOffences'],
      })
    }
  })

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

    // Try to fetch offence details from the API if service is available
    if (this.preSentenceToDeliusService && reportId && this.report) {
      try {
        logger.info({ reportId }, 'Fetching offence details from Pre-Sentence to Delius API')
        const apiData = await this.preSentenceToDeliusService.getOffences(reportId)

        // Transform API data to application format
        const transformedOffences = transformOffenceDetails(apiData)

        // Store the offence data for template rendering
        this.data = {
          ...this.data,
          offencesData: transformedOffences,
          apiOffencesAvailable: true,
        }

        logger.info({ reportId }, 'Successfully fetched offence details from API')
      } catch (error) {
        logger.warn({ reportId, error }, 'Failed to fetch offence details from API, using database data')
        // Continue without API offence data - error is logged but not thrown
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
