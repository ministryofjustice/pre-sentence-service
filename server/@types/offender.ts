export type Address = {
  buildingName: string
  county: string
  district: string
  from: string
  noFixedAbode: boolean
  addressNumber: string
  streetName: string
  town: string
  postcode: string
  status: {
    code: string
    description: string
  }
  type: {
    code: string
    description: string
  }
  typeVerified: boolean
  latestAssessmentDate: string
  createdDatetime: string
  lastUpdatedDatetime: string
}

export type OffenderManager = {
  trustOfficer: {
    forenames: string
    surname: string
  }
  staff: {
    code: string
    forenames: string
    surname: string
    unallocated: boolean
  }
  partitionArea: string
  softDeleted: boolean
  team: {
    code: string
    description: string
    localDeliveryUnit: {
      code: string
      description: string
    }
    district: {
      code: string
      description: string
    }
    borough: {
      code: string
      description: string
    }
  }
  probationArea: {
    code: string
    description: string
    nps: boolean
  }
  fromDate: string
  active: boolean
  allocationReason: {
    code: string
    description: string
  }
}

export type Offender = {
  offenderId: number
  firstName: string
  middleNames: Array<string>
  surname: string
  preferredName: string
  dateOfBirth: string
  gender: string
  otherIds: {
    crn: string
    nomsNumber: string
    pncNumber: string
    mostRecentPrisonerNumber: string
  }
  contactDetails: {
    addresses: Array<Address>
  }
  offenderProfile: {
    remandStatus: string
    previousConviction: {
      convictionDate: string
      detail: {
        documentName: string
      }
    }
    disabilities: [
      {
        disabilityId: number
        disabilityType: {
          code: string
          description: string
        }
        startDate: string
        notes: string
        provisions: [
          {
            provisionId: number
            notes: string
            startDate: string
            provisionType: {
              code: string
              description: string
            }
          }
        ]
        lastUpdatedDateTime: string
        isActive: boolean
      }
    ]
    genderIdentity: string
    selfDescribedGender: string
  }
  offenderManagers: Array<OffenderManager>
  softDeleted: boolean
  currentDisposal: string
  partitionArea: string
  currentRestriction: boolean
  restrictionMessage: string
  currentExclusion: boolean
  exclusionMessage: string
  currentTier: string
  activeProbationManagedSentence: boolean
}
