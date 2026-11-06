import type ReportService from '../services/reportService'
import type PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import { TransformedOffence, transformOffenceDetails } from './apiDataTransformers'
import { htmlToPlainText } from './htmlToPlainText'
import logger from '../../logger'

export const OFFENCES_PAGE_NAME = 'edit-offences'

export interface StoredOffences {
  mainOffence: string
  additionalOffences: string[]
}

export const formatOffenceLine = (offence: TransformedOffence): string => `${offence.description} - ${offence.date}`

export const splitOffenceLines = (text: unknown): string[] =>
  typeof text === 'string'
    ? text
        .split(/\r?\n/)
        .flatMap(line => htmlToPlainText(line).split(/\r?\n/))
        .map(line => line.trim())
        .filter(Boolean)
    : []

export const readStoredOffences = (data: Record<string, unknown>): StoredOffences | null => {
  const mainOffence = typeof data.mainOffence === 'string' ? data.mainOffence.trim() : ''
  if (!mainOffence) {
    return null
  }
  return { mainOffence, additionalOffences: splitOffenceLines(data.additionalOffences) }
}

export async function ensureStoredOffences(
  data: Record<string, unknown>,
  reportId: string,
  reportService: ReportService,
  preSentenceToDeliusService?: PreSentenceToDeliusService
): Promise<StoredOffences | null> {
  const stored = readStoredOffences(data)
  if (stored) {
    return stored
  }

  if (!preSentenceToDeliusService) {
    return null
  }

  try {
    const apiData = await preSentenceToDeliusService.getOffences(reportId)
    const transformed = transformOffenceDetails(apiData)
    const mainOffence = formatOffenceLine(transformed.mainOffence)
    const additionalOffences = splitOffenceLines(transformed.additionalOffences.map(formatOffenceLine).join('\n'))

    await reportService.updateFieldValues(reportId, [
      { pageName: OFFENCES_PAGE_NAME, questionId: 0, questionValue: 'mainOffence', answer: mainOffence },
      {
        pageName: OFFENCES_PAGE_NAME,
        questionId: 1,
        questionValue: 'additionalOffences',
        answer: additionalOffences.join('\n'),
      },
    ])

    return { mainOffence, additionalOffences }
  } catch (error) {
    logger.warn({ reportId, error }, 'Failed to fetch offence details from Pre-Sentence to Delius API')
    return null
  }
}
