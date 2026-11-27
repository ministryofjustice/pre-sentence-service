import ReportDetails from '../repositories/entities/reportDetails'
import ReportService from '../services/reportService'
import PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import { ReportOffences } from '../@types/reportOffences'
import { toReportOffences } from './apiDataTransformers'
import logger from '../../logger'

export async function ensureStoredOffences(
  report: ReportDetails,
  reportService: ReportService,
  preSentenceToDeliusService?: PreSentenceToDeliusService
): Promise<ReportOffences | null> {
  if (report.offences) {
    return report.offences
  }

  if (!preSentenceToDeliusService) {
    logger.warn({ reportId: report.id }, 'No PreSentenceToDeliusService available to fetch offences')
    return null
  }

  let offences: ReportOffences
  try {
    const apiOffenceDetails = await preSentenceToDeliusService.getOffences(report.id)
    offences = toReportOffences(apiOffenceDetails)
  } catch (error) {
    logger.warn({ reportId: report.id, error }, 'Failed to fetch offences from Pre-Sentence to Delius')
    return null
  }

  try {
    await reportService.updateReportOffences(report.id, offences)
  } catch (error) {
    logger.warn({ reportId: report.id, error }, 'Failed to persist offences snapshot')
  }

  return offences
}
