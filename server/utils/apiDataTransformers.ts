import {
  DefendantDetails,
  OffenceDetails,
  Name as ApiName,
  Address as ApiAddress,
  Offence,
} from '../@types/preSentenceToDelius'
import logger from '../../logger'

/**
 * Transform API Name format to application format
 */
export function transformName(apiName: ApiName): string {
  const parts = [apiName.forename, apiName.middleName, apiName.surname].filter(Boolean)
  return parts.join(' ')
}

/**
 * Transform API Address format to application format
 * Returns object with flattened address fields matching the template expectations
 */
export function transformAddress(apiAddress?: ApiAddress): Record<string, string> {
  if (!apiAddress) {
    return {
      'address-buildingName': '',
      'address-number': '',
      'address-streetName': '',
      'address-town': '',
      'address-district': '',
      'address-county': '',
      'address-postcode': '',
    }
  }

  return {
    'address-buildingName': apiAddress.buildingName || '',
    'address-number': apiAddress.buildingNumber || '',
    'address-streetName': apiAddress.streetName || '',
    'address-town': apiAddress.town || '',
    'address-district': apiAddress.district || '',
    'address-county': apiAddress.county || '',
    'address-postcode': apiAddress.postcode || '',
  }
}

/**
 * Transform API DefendantDetails to application data format
 */
export function transformDefendantDetails(apiData: DefendantDetails): Record<string, unknown> {
  logger.debug({ apiData }, 'Transforming defendant details from API')

  return {
    name: transformName(apiData.name),
    dateOfBirth: new Date(apiData.dateOfBirth),
    crn: apiData.crn,
    ...transformAddress(apiData.mainAddress),
  }
}

/**
 * Format offence description with code
 */
export function formatOffenceDescription(offence: Offence): string {
  return `${offence.subCategory.description} (${offence.subCategory.code})`
}

/**
 * Format offence date from ISO string to DD/MM/YYYY
 */
export function formatOffenceDate(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  } catch (error) {
    logger.warn({ isoDate, error }, 'Failed to format offence date')
    return isoDate
  }
}

/**
 * Transform API Offence to template format
 */
export interface TransformedOffence {
  description: string
  code: string
  date: string
  isMainOffence?: boolean
}

export function transformOffence(offence: Offence, isMainOffence = false): TransformedOffence {
  return {
    description: offence.subCategory.description,
    code: offence.subCategory.code,
    date: formatOffenceDate(offence.date),
    isMainOffence,
  }
}

/**
 * Transform API OffenceDetails to application format
 */
export interface TransformedOffences {
  mainOffence: TransformedOffence
  additionalOffences: TransformedOffence[]
}

export function transformOffenceDetails(apiData: OffenceDetails): TransformedOffences {
  logger.debug({ apiData }, 'Transforming offence details from API')

  return {
    mainOffence: transformOffence(apiData.mainOffence, true),
    additionalOffences: apiData.additionalOffences.map(offence => transformOffence(offence, false)),
  }
}
