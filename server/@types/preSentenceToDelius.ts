// Types for pre-sentence-reports-to-delius API responses
// Based on OpenAPI spec: https://pre-sentence-reports-to-delius-dev.hmpps.service.justice.gov.uk/swagger-ui/index.html

export interface Name {
  forename: string
  middleName?: string
  surname: string
}

export interface Address {
  buildingName?: string
  buildingNumber?: string
  streetName?: string
  district?: string
  town?: string
  county?: string
  postcode?: string
  noFixedAbode?: boolean
}

export interface DefendantDetails {
  crn: string
  eventNumber: number
  name: Name
  dateOfBirth: string // ISO date format
  mainAddress?: Address
}

export interface CodeAndDescription {
  code: string
  description: string
}

export interface Offence {
  date: string // ISO date format
  mainCategory: CodeAndDescription
  subCategory: CodeAndDescription
}

export interface OffenceDetails {
  mainOffence: Offence
  additionalOffences: Offence[]
}
