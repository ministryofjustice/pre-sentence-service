// Initialise telemetry before loading modules that need instrumentation.
import './server/utils/azureAppInsights'
import { flushTelemetry } from '@ministryofjustice/hmpps-azure-telemetry'
import fs from 'fs'
import createApplication from './server/index'
import logger from './logger'
import config from './server/config'

createApplication()
  .then(app => {
    const server = app.listen(app.get('port'), () => {
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

    const shutdown = (signal: NodeJS.Signals): void => {
      logger.info({ signal }, 'Shutting down application')

      server.close(async error => {
        if (error) {
          logger.error({ err: error }, 'Failed to close HTTP server')
        }

        try {
          await flushTelemetry()
        } finally {
          process.exit(error ? 1 : 0)
        }
      })
    }

    process.once('SIGTERM', () => shutdown('SIGTERM'))
    process.once('SIGINT', () => shutdown('SIGINT'))
  })
  .catch(error => {
    logger.error(`Failed to start application: ${error.message}`)
  })
