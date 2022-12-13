import { Application } from 'express'
import configureApplication from './app'
import HmppsAuthClient from './data/hmppsAuthClient'
import { createRedisClient } from './data/redisClient'
import TokenStore from './data/tokenStore'
import PreSentenceToDeliusService from './services/preSentenceToDeliusService'
import UserService from './services/userService'
import CommunityService from './services/communityService'
import getDatabaseConnection from './repositories/db'

export default async function createApplication(): Promise<Application> {
  const hmppsAuthClient = new HmppsAuthClient(new TokenStore(createRedisClient({ legacyMode: false })))
  const userService = new UserService(hmppsAuthClient)
  const preSentenceToDeliusService = new PreSentenceToDeliusService(hmppsAuthClient)
  const communityService = new CommunityService(hmppsAuthClient)
  const [error] = await getDatabaseConnection()

  if (error) {
    throw new Error('Unable to create database connection')
  }

  return configureApplication(userService, communityService, preSentenceToDeliusService)
}
