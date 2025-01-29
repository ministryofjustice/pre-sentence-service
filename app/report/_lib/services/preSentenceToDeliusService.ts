import Agent, { HttpsAgent } from 'agentkeepalive'
import superagent from 'superagent'

import type HmppsAuthClient from './hmppsAuthClient'
import sanitise from '../../../../server/sanitisedError'

// import logger from '../../logger'
// import sanitise from '../sanitisedError'

export interface IContextAddress {
  noFixedAbode: boolean
  buildingName: string
  addressNumber: number
  streetName: string
  town: string
  district: string
  county: string
  postcode: string
}

export interface IContextOffence {
  description: string
}

export interface IContext {
  crn: string
  name: {
    forename: string
    surname: string
    middleName: string
  }
  dateOfBirth: string
  pnc: string
  address: IContextAddress
  mainOffence: {
    description: string
  }
  otherOffences: Array<IContextOffence>
  court: {
    name: string
    localJusticeArea: {
      name: string
    }
  }
}

export default class PreSentenceToDeliusService {
  constructor(private readonly hmppsAuthClient: HmppsAuthClient) {}

  private apiUrl = process.env.PRE_SENTENCE_TO_DELIUS_API_URL

  async getApiClientToken(): Promise<string> {
    return this.hmppsAuthClient.getApiClientToken()
  }

  private clientGetBuilder() {
    const timeoutSpec = {
      response: parseInt(process.env.TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE, 10),
      deadline: parseInt(process.env.TOKEN_VERIFICATION_API_TIMEOUT_DEADLINE, 10),
    }

    const agentOptions = {
      maxSockets: 100,
      maxFreeSockets: 10,
      freeSocketTimeout: 30000,
    }

    const keepaliveAgent = this.apiUrl.startsWith('https') ? new HttpsAgent(agentOptions) : new Agent(agentOptions)

    return async ({
      path = undefined,
      query = '',
      headers = {},
      responseType = '',
      raw = false,
      timeout = timeoutSpec,
    } = {}) => {
      // const time = new Date().getTime()
      try {
        const clientToken = await this.getApiClientToken()
        const result = await superagent
          .get(path)
          .agent(keepaliveAgent)
          .retry(2, err => {
            // if (err)
            //   logger.warn(`PreSentenceToDeliusService: Retry handler found API error with ${err.code} ${err.message}`)
            return undefined // retry handler only for logging retries, not to influence retry logic
          })
          .query(query)
          .set('Authorization', `Bearer ${clientToken}`)
          .set(headers)
          .responseType(responseType)
          .timeout(timeout)

        // const durationMillis = Math.ceil(time - new Date().getTime())
        // logger.debug(
        //   { path, query, durationMillis },
        //   'PreSentenceToDeliusService: Client GET using clientId credentials'
        // )

        return raw ? result : result.body
      } catch (error) {
        const sanitisedError = sanitise(error)
        // logger.error(
        //   { ...sanitisedError, path, query },
        //   'PreSentenceToDeliusService: Error in Client GET using clientId credentials'
        // )
        throw sanitisedError
      }
    }
  }

  private client = this.clientGetBuilder()

  async getContext(reportId: string): Promise<IContext> {
    const path = `${this.apiUrl}/context/${reportId}`
    const context = await this.client({ path })
    return context as IContext
  }
}
