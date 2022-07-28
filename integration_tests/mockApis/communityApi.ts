import { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'

export default {
  stubUserAccess: (status = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/secure/offenders/crn/X320741/user/USER1/userAccess`,
      },
      response: {
        status,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          userRestricted: false,
          userExcluded: false,
          restrictionMessage: '',
          exclusionMessage: '',
        },
      },
    }),
  stubUserAccessRestricted: (status = 403): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/secure/offenders/crn/X320741/user/USER1/userAccess`,
      },
      response: {
        status,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          userRestricted: true,
          userExcluded: false,
          restrictionMessage: 'User access to offender record is restricted',
          exclusionMessage: '',
        },
      },
    }),
  stubUserAccessExcluded: (status = 403): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/secure/offenders/crn/X320741/user/USER1/userAccess`,
      },
      response: {
        status,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {
          userRestricted: false,
          userExcluded: true,
          restrictionMessage: '',
          exclusionMessage: 'User is excluded from offender record access',
        },
      },
    }),
  stubUserAccessFailed: (status = 500): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: `/secure/offenders/crn/X320741/user/USER1/userAccess`,
      },
      response: {
        status,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        jsonBody: {},
      },
    }),
}
