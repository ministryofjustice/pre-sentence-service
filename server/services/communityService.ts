import Agent, { HttpsAgent } from 'agentkeepalive'
import superagent from 'superagent'

import type HmppsAuthClient from '../data/hmppsAuthClient'

import config from '../config'
import logger from '../../logger'
import sanitise from '../sanitisedError'

export default class CommunityService {
  constructor(private readonly hmppsAuthClient: HmppsAuthClient) {}

  private apiUrl = config.apis.communityApi.url

  async getApiClientToken(): Promise<string> {
    return this.hmppsAuthClient.getApiClientToken()
  }

  private clientGetBuilder() {
    const timeoutSpec = {
      response: config.apis.communityApi.timeout.response,
      deadline: config.apis.communityApi.timeout.deadline,
    }

    const agentOptions = {
      maxSockets: config.apis.communityApi.agent.maxSockets,
      maxFreeSockets: config.apis.communityApi.agent.maxFreeSockets,
      freeSocketTimeout: config.apis.communityApi.agent.freeSocketTimeout,
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
            if (err) logger.warn(`CommunityService: Retry handler found API error with ${err.code} ${err.message}`)
            return undefined // retry handler only for logging retries, not to influence retry logic
          })
          .query(query)
          .set('Authorization', `Bearer ${clientToken}`)
          .set(headers)
          .responseType(responseType)
          .timeout(timeout)

        const durationMillis = Math.ceil(time - new Date().getTime())
        logger.debug({ path, query, durationMillis }, 'CommunityService: Client GET using clientId credentials')

        return raw ? result : result.body
      } catch (error: any) {
        const sanitisedError = sanitise(error)
        logger.error(
          { ...sanitisedError, path, query },
          'CommunityService: Error in Client GET using clientId credentials'
        )
        throw sanitisedError
      }
    }
  }

  private client = this.clientGetBuilder()

  async getUserAccess(crn: string, username: string) {
    const path = `${this.apiUrl}/secure/offenders/crn/${crn}/user/${username}/userAccess`
    return this.client({ path })
  }
}
