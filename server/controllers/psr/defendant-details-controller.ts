import { Request, Response } from 'express'
import BaseController from './baseController'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { transformDefendantDetails } from '../../utils/apiDataTransformers'
import logger from '../../../logger'

export const pageFields: Array<string> = [
  'name',
  'dateOfBirth',
  'age',
  'crn',
  'pnc',
  'address-buildingName',
  'address-number',
  'address-streetName',
  'address-town',
  'address-district',
  'address-county',
  'address-postcode',
]

export default class DefendantDetails extends BaseController {
  override templatePath = 'psr-defendant-details'

  override redirectPath = 'offence-analysis'

  override pageFields = pageFields

  private preSentenceToDeliusService?: PreSentenceToDeliusService

  constructor(reportService: import('../../services/reportService').default, preSentenceToDeliusService?: PreSentenceToDeliusService) {
    super(reportService)
    this.preSentenceToDeliusService = preSentenceToDeliusService
  }

  protected override async beforeRender(req: Request, _res: Response): Promise<void> {
    const reportId = req.params.reportId

    // Try to fetch defendant details from the API if service is available
    if (this.preSentenceToDeliusService && reportId) {
      try {
        logger.info({ reportId }, 'Fetching defendant details from Pre-Sentence to Delius API')
        const apiData = await this.preSentenceToDeliusService.getDefendantDetails(reportId)

        // Transform API data to application format
        const transformedData = transformDefendantDetails(apiData)

        // Store the API data in the report for future use
        this.data = {
          ...this.data,
          ...transformedData,
          apiDataAvailable: true,
        }

        logger.info({ reportId }, 'Successfully fetched defendant details from API')
      } catch (error) {
        logger.warn(
          { reportId, error },
          'Failed to fetch defendant details from API, falling back to database data'
        )
        // Continue with database data - error is logged but not thrown
        this.data = {
          ...this.data,
          apiDataAvailable: false,
        }
      }
    }
  }
}
