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

      // Log AWS SNS configuration for domain events
      logger.info('AWS SNS Domain Events Configuration', {
        awsRegion: config.aws.sns.region,
        topicArn: config.aws.sns.topicArn || 'NOT_SET',
        topicArnEnvVar: process.env.TOPIC_ARN || 'NOT_SET',
        endpoint: config.aws.sns.endpoint || 'NOT_SET (using AWS default)',
        eventVersion: config.aws.sns.eventVersion,
        hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
        awsRoleArn: process.env.AWS_ROLE_ARN || 'NOT_SET',
        awsWebIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE || 'NOT_SET',
      })
    })
  })
  .catch(error => {
    logger.error(`Failed to start application: ${error.message}`)
  })
