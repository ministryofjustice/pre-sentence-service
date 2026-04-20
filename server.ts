/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import fs from 'fs'
import { initialiseAppInsights, buildAppInsightsClient } from './server/utils/azureAppInsights'

initialiseAppInsights()
buildAppInsightsClient()

import createApplication from './server/index'
import logger from './logger'
import config from './server/config'

createApplication()
  .then(app => {
    app.listen(app.get('port'), () => {
      const data = fs.readFileSync('./assets/banner.txt', 'utf8')

      console.log(data.toString())
      logger.info(`Server listening on port: ${app.get('port')}`)

      // Log AWS configuration for domain events
      logger.info('AWS Domain Events Configuration', {
        awsRegion: config.domainEvents.sqs.region,
        queueUrl: config.domainEvents.sqs.queueUrl || 'NOT_SET',
        awsEndpoint: config.domainEvents.sqs.endpoint || 'NOT_SET (using AWS default)',
        awsEndpointEnvVar: process.env.AWS_ENDPOINT || 'NOT_SET',
        hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
        awsRoleArn: process.env.AWS_ROLE_ARN || 'NOT_SET',
      })
    })
  })
  .catch(error => {
    logger.error(`Failed to start application: ${error.message}`)
  })
