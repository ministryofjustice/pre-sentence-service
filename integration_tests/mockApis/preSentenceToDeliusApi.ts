import { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'
import type { DefendantDetails, OffenceDetails } from '../../server/@types/preSentenceToDelius'

const defaultDefendantDetails: DefendantDetails = {
  crn: 'X320741',
  eventNumber: 1,
  name: {
    forename: 'John',
    middleName: 'David',
    surname: 'Smith',
  },
  dateOfBirth: '1985-06-15',
  mainAddress: {
    buildingName: 'Acme Building',
    buildingNumber: '123',
    streetName: 'High Street',
    district: 'Central',
    town: 'Sheffield',
    county: 'South Yorkshire',
    postcode: 'S1 2BJ',
    noFixedAbode: false,
  },
}

const defaultOffenceDetails: OffenceDetails = {
  mainOffence: {
    date: '2024-01-15',
    mainCategory: {
      code: '001',
      description: 'Theft',
    },
    subCategory: {
      code: '001-001',
      description: 'Theft from a shop',
    },
  },
  additionalOffences: [
    {
      date: '2024-01-15',
      mainCategory: {
        code: '002',
        description: 'Criminal damage',
      },
      subCategory: {
        code: '002-001',
        description: 'Criminal damage to property',
      },
    },
  ],
}

export default {
  stubDefendantDetails: (
    psrUuid = 'b7b8b7b8-b7b8-b7b8-b7b8-b7b8b7b8b7b8',
    status = 200,
    customData?: Partial<DefendantDetails>
  ): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/report/${psrUuid}/defendant-details`,
      },
      response: {
        status,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          ...defaultDefendantDetails,
          ...customData,
        },
      },
    }),

  stubDefendantDetailsNotFound: (psrUuid = 'b7b8b7b8-b7b8-b7b8-b7b8-b7b8b7b8b7b8'): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/report/${psrUuid}/defendant-details`,
      },
      response: {
        status: 404,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          status: 404,
          error: 'Not Found',
          message: `Report with UUID ${psrUuid} not found`,
        },
      },
    }),

  stubDefendantDetailsNoFixedAbode: (psrUuid = 'b7b8b7b8-b7b8-b7b8-b7b8-b7b8b7b8b7b8'): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/report/${psrUuid}/defendant-details`,
      },
      response: {
        status: 200,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          ...defaultDefendantDetails,
          mainAddress: {
            noFixedAbode: true,
          },
        },
      },
    }),

  stubOffences: (
    crn = 'X320741',
    eventNumber = 1,
    status = 200,
    customData?: Partial<OffenceDetails>
  ): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/case/${crn}/event/${eventNumber}/offences`,
      },
      response: {
        status,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          ...defaultOffenceDetails,
          ...customData,
        },
      },
    }),

  stubOffencesNotFound: (crn = 'X320741', eventNumber = 1): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/case/${crn}/event/${eventNumber}/offences`,
      },
      response: {
        status: 404,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          status: 404,
          error: 'Not Found',
          message: `Offences for CRN ${crn} and event ${eventNumber} not found`,
        },
      },
    }),

  stubOffencesWithMultipleAdditional: (crn = 'X320741', eventNumber = 1): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/case/${crn}/event/${eventNumber}/offences`,
      },
      response: {
        status: 200,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          mainOffence: defaultOffenceDetails.mainOffence,
          additionalOffences: [
            ...defaultOffenceDetails.additionalOffences,
            {
              date: '2024-01-15',
              mainCategory: {
                code: '003',
                description: 'Assault',
              },
              subCategory: {
                code: '003-001',
                description: 'Common assault',
              },
            },
            {
              date: '2024-01-16',
              mainCategory: {
                code: '004',
                description: 'Drug offences',
              },
              subCategory: {
                code: '004-002',
                description: 'Possession of Class B drugs',
              },
            },
          ],
        },
      },
    }),

  stubOffencesServerError: (crn = 'X320741', eventNumber = 1): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/case/${crn}/event/${eventNumber}/offences`,
      },
      response: {
        status: 500,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          status: 500,
          error: 'Internal Server Error',
          message: 'An error occurred while retrieving offences',
        },
      },
    }),

  stubDefendantDetailsServerError: (psrUuid = 'b7b8b7b8-b7b8-b7b8-b7b8-b7b8b7b8b7b8'): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/report/${psrUuid}/defendant-details`,
      },
      response: {
        status: 500,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          status: 500,
          error: 'Internal Server Error',
          message: 'An error occurred while retrieving defendant details',
        },
      },
    }),
}
