import {
  DefendantDetails,
  OffenceDetails,
  Name as ApiName,
  Address as ApiAddress,
  Offence,
} from '../@types/preSentenceToDelius'
import logger from '../../logger'
import config from '../config'

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
 * Generate fake additional offences for development purposes
 */
function generateFakeAdditionalOffences(count: number): Offence[] {
  const fakeOffences: Array<{ code: string; description: string }> = [
    { code: 'TH68001', description: 'Theft from a shop' },
    { code: 'CJ88001', description: 'Common assault' },
    { code: 'CJ88002', description: 'Assault occasioning actual bodily harm' },
    { code: 'TH68023', description: 'Burglary - dwelling' },
    { code: 'CD98001', description: 'Criminal damage to property valued under £5000' },
    { code: 'DR10001', description: 'Driving whilst disqualified' },
    { code: 'RT88001', description: 'Public order offence' },
    { code: 'FH68001', description: 'Fraud by false representation' },
  ]

  const generatedOffences: Offence[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const selectedOffence = fakeOffences[i % fakeOffences.length]
    // Generate dates going back in time (30-365 days ago)
    const daysAgo = 30 + Math.floor(Math.random() * 335)
    const offenceDate = new Date(now)
    offenceDate.setDate(offenceDate.getDate() - daysAgo)

    generatedOffences.push({
      date: offenceDate.toISOString(),
      mainCategory: {
        code: selectedOffence.code.substring(0, 2),
        description: 'Main category',
      },
      subCategory: {
        code: selectedOffence.code,
        description: selectedOffence.description,
      },
    })
  }

  return generatedOffences
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

  let additionalOffences = apiData.additionalOffences

  // If dev mode is enabled and there are no additional offences, generate fake ones
  if (config.dev.fakeAdditionalOffences && additionalOffences.length === 0) {
    const count = Math.floor(Math.random() * 3) + 1 // Random number between 1 and 3
    logger.info({ count }, 'DEV: Generating fake additional offences')
    additionalOffences = generateFakeAdditionalOffences(count)
  }

  return {
    mainOffence: transformOffence(apiData.mainOffence, true),
    additionalOffences: additionalOffences.map(offence => transformOffence(offence, false)),
  }
}
