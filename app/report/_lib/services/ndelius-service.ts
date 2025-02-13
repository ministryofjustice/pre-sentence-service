import { createRedisClient } from './redisClient'

import HmppsAuthClient from './hmppsAuthClient'
import TokenStore from './tokenStore'
import PreSentenceToDeliusService from './preSentenceToDeliusService'

export default class NdeliusService {
  private static instance: PreSentenceToDeliusService

  static getInstance(): PreSentenceToDeliusService {
    if (this.instance) {
      return this.instance
    }
    const redisClient = createRedisClient({ legacyMode: false })
    const hmppsAuthClient = new HmppsAuthClient(new TokenStore(redisClient))
    const ndeliusService = new PreSentenceToDeliusService(hmppsAuthClient)
    this.instance = ndeliusService

    return this.instance
  }
}
