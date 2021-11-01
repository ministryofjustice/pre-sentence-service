import { Application } from 'express'
import configureApplication from './app'
import HmppsAuthClient from './data/hmppsAuthClient'
import TokenStore from './data/tokenStore'
import UserService from './services/userService'
import getDatabaseConnection from './repositories/db'
import logger from '../logger'

export default async function createApplication(): Promise<Application> {
  const hmppsAuthClient = new HmppsAuthClient(new TokenStore())
  const userService = new UserService(hmppsAuthClient)
  const [error, databaseConnection] = await getDatabaseConnection()

  if (error) {
    logger.error('Database connection error, continue app and report.')
  }

  return configureApplication(userService, databaseConnection)
}
