import HmppsAuthClient from '../../../../server/data/hmppsAuthClient'
import { createRedisClient } from '../../../../server/data/redisClient'
import TokenStore from '../../../../server/data/tokenStore'
import PreSentenceToDeliusService from '../../../../server/services/preSentenceToDeliusService'

export default class NdeliusService {
  private static instance: PreSentenceToDeliusService

  static getInstance(): PreSentenceToDeliusService {
    if (this.instance) {
      return this.instance
    }

    const hmppsAuthClient = new HmppsAuthClient(new TokenStore(createRedisClient({ legacyMode: false })))
    const ndeliusService = new PreSentenceToDeliusService(hmppsAuthClient)

    return ndeliusService
  }
}
