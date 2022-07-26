export type Offence = {
  offenceId: string
  mainOffence: boolean
  detail: {
    code: string
    description: string
    mainCategoryCode: string
    mainCategoryDescription: string
    mainCategoryAbbreviation: string
    ogrsOffenceCategory: string
    subCategoryCode: string
    subCategoryDescription: string
    form20Code: string
  }
  offenceDate: string
  offenceCount: number
  offenderId: number
  createdDatetime: string
  lastUpdatedDatetime: string
}

export type Sentence = {
  sentenceId: number
  description: string
  originalLength: number
  originalLengthUnits: string
  secondLength: number
  secondLengthUnits: string
  defaultLength: number
  lengthInDays: number
  expectedSentenceEndDate: string
  startDate: string
  sentenceType: {
    code: string
    description: string
  }
  additionalSentences: [
    {
      additionalSentenceId: number
      type: {
        code: string
        description: string
      }
      amount: number
      length: number
      notes: string
    }
  ]
  failureToComplyLimit: number
  cja2003Order: boolean
  legacyOrder: boolean
}

export type OffenceInformation = {
  convictionId: number
  index: string
  active: boolean
  inBreach: boolean
  failureToComplyCount: number
  awaitingPsr: boolean
  convictionDate: string
  referralDate: string
  offences: Array<Offence>
  sentence: Sentence
  latestCourtAppearanceOutcome: {
    code: string
    description: string
  }
  custody: {
    bookingNumber: string
    institution: {
      institutionId: number
      isEstablishment: boolean
      code: string
      description: string
      institutionName: string
      establishmentType: {
        code: string
        description: string
      }
      isPrivate: boolean
      nomsPrisonInstitutionCode: string
    }
    status: {
      code: string
      description: string
    }
    sentenceStartDate: string
  }
  responsibleCourt: {
    courtId: number
    code: string
    selectable: boolean
    courtName: string
    telephoneNumber: string
    fax: string
    buildingName: string
    town: string
    county: string
    postcode: string
    country: string
    courtTypeId: number
    createdDatetime: string
    lastUpdatedDatetime: string
    probationAreaId: number
    probationArea: {
      code: string
      description: string
    }
    courtType: {
      code: string
      description: string
    }
  }
  courtAppearance: {
    courtAppearanceId: number
    appearanceDate: string
    courtCode: string
    courtName: string
    appearanceType: {
      code: string
      description: string
    }
    crn: string
  }
  orderManagers: [
    {
      probationAreaId: number
      teamId: number
      officerId: number
      name: string
      staffCode: string
      dateStartOfAllocation: string
      dateEndOfAllocation: string
    },
    {
      probationAreaId: number
      teamId: number
      officerId: number
      name: string
      staffCode: string
      dateStartOfAllocation: string
      gradeCode: string
    }
  ]
}
