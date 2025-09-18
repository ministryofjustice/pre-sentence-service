import Agent, { HttpsAgent } from 'agentkeepalive'
import superagent from 'superagent'

import type HmppsAuthClient from '../data/hmppsAuthClient'

import config from '../config'
import logger from '../../logger'
import sanitise from '../sanitisedError'
import { HttpError } from 'http-errors'

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

  private apiUrl = config.apis.preSentenceToDeliusApi.url

  async getApiClientToken(): Promise<string> {
    return this.hmppsAuthClient.getApiClientToken()
  }

  private clientGetBuilder() {
    const timeoutSpec = {
      response: config.apis.preSentenceToDeliusApi.timeout.response,
      deadline: config.apis.preSentenceToDeliusApi.timeout.deadline,
    }

    const agentOptions = {
      maxSockets: config.apis.preSentenceToDeliusApi.agent.maxSockets,
      maxFreeSockets: config.apis.preSentenceToDeliusApi.agent.maxFreeSockets,
      freeSocketTimeout: config.apis.preSentenceToDeliusApi.agent.freeSocketTimeout,
    }

    const keepaliveAgent = this.apiUrl.startsWith('https') ? new HttpsAgent(agentOptions) : new Agent(agentOptions)

    return async ({
      path = '',
      query = '',
      headers = {},
      responseType = '',
      raw = false,
      timeout = timeoutSpec,
    } = {}) => {
      const time = new Date().getTime()
      try {
        const clientToken = await this.getApiClientToken()
        const result = await superagent
          .get(path)
          .agent(keepaliveAgent)
          .retry(2, err => {
            if (err)
              logger.warn(`PreSentenceToDeliusService: Retry handler found API error with ${err.code} ${err.message}`)
            return undefined // retry handler only for logging retries, not to influence retry logic
          })
          .query(query)
          .set('Authorization', `Bearer ${clientToken}`)
          .set(headers)
          .responseType(responseType)
          .timeout(timeout)

        const durationMillis = Math.ceil(time - new Date().getTime())
        logger.debug(
          { path, query, durationMillis },
          'PreSentenceToDeliusService: Client GET using clientId credentials'
        )

        return raw ? result : result.body
      } catch (e) {
        const error = e as HttpError
        const sanitisedError = sanitise(error)
        logger.error(
          { ...sanitisedError, path, query },
          'PreSentenceToDeliusService: Error in Client GET using clientId credentials'
        )
        throw sanitisedError
      }
    }
  }

  private client = this.clientGetBuilder()

  async getContext(reportId: string) {
    const path = `${this.apiUrl}/context/${reportId}`
    return this.client({ path })
  }
}
