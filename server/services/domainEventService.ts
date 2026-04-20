import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { fromTokenFile } from '@aws-sdk/credential-provider-web-identity'
import config from '../config'
import logger from '../../logger'

export interface PSRCompletedEventData {
  psrId: string
  crn: string
  username: string
  pdfUrl: string
}

export interface DomainEvent {
  eventType: string
  version: number
  description: string
  detailUrl: string
  occurredAt: string
  additionalInformation: Record<string, unknown>
  personReference: {
    identifiers: Array<{
      type: string
      value: string
    }>
  }
}

export default class DomainEventService {
  private sqsClient: SQSClient

  constructor() {
    logger.info('DomainEventService: Initializing service', {
      region: config.domainEvents.sqs.region,
      hasQueueUrl: !!config.domainEvents.sqs.queueUrl,
      queueUrl: config.domainEvents.sqs.queueUrl || 'NOT_SET',
      hasEndpoint: !!config.domainEvents.sqs.endpoint,
      endpoint: config.domainEvents.sqs.endpoint || 'not set (using AWS default)',
      awsEndpointEnvVar: process.env.AWS_ENDPOINT || 'NOT_SET',
      hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
      awsRoleArn: process.env.AWS_ROLE_ARN || 'NOT_SET',
      awsWebIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE || 'NOT_SET',
    })

    const sqsConfig: {
      region: string
      endpoint?: string
      credentials?: ReturnType<typeof fromTokenFile>
    } = {
      region: config.domainEvents.sqs.region,
    }

    // Only set endpoint for local development with localstack
    if (config.domainEvents.sqs.endpoint) {
      sqsConfig.endpoint = config.domainEvents.sqs.endpoint
      logger.info('DomainEventService: Using custom SQS endpoint', {
        endpoint: sqsConfig.endpoint,
      })
    }

    // Use IRSA credentials if available (for Cloud Platform)
    if (process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE) {
      sqsConfig.credentials = fromTokenFile({
        roleArn: process.env.AWS_ROLE_ARN,
        webIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE,
      })
      logger.info('DomainEventService: Using IRSA credentials', {
        roleArn: process.env.AWS_ROLE_ARN,
      })
    }

    this.sqsClient = new SQSClient(sqsConfig)
    logger.info('DomainEventService: SQS client initialized successfully')
  }

  async publishPSRCompletedEvent(eventData: PSRCompletedEventData): Promise<void> {
    logger.info('DomainEventService: Building PSR completed event', {
      psrId: eventData.psrId,
      crn: eventData.crn,
      username: eventData.username,
      pdfUrl: eventData.pdfUrl,
    })

    const event: DomainEvent = {
      eventType: 'pre-sentence.report.created',
      version: 1,
      description: 'PSR Report event',
      detailUrl: eventData.pdfUrl,
      occurredAt: new Date().toISOString(),
      additionalInformation: {
        psrId: eventData.psrId,
        username: eventData.username,
      },
      personReference: {
        identifiers: [
          {
            type: 'CRN',
            value: eventData.crn,
          },
        ],
      },
    }

    logger.info('DomainEventService: Event structure created', {
      eventType: event.eventType,
      version: event.version,
      psrId: eventData.psrId,
      crn: eventData.crn,
      occurredAt: event.occurredAt,
    })

    try {
      logger.info('DomainEventService: Preparing SQS message', {
        queueUrl: config.domainEvents.sqs.queueUrl,
        region: config.domainEvents.sqs.region,
        hasEndpoint: !!config.domainEvents.sqs.endpoint,
        endpoint: config.domainEvents.sqs.endpoint || 'default',
        awsEndpointEnvVar: process.env.AWS_ENDPOINT || 'NOT_SET',
        messageSize: JSON.stringify(event).length,
        hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
      })

      const command = new SendMessageCommand({
        QueueUrl: config.domainEvents.sqs.queueUrl,
        MessageBody: JSON.stringify(event),
      })

      logger.info('DomainEventService: Sending message to SQS', {
        psrId: eventData.psrId,
        eventType: event.eventType,
      })

      const response = await this.sqsClient.send(command)

      logger.info('DomainEventService: Domain event published successfully to SQS', {
        eventType: event.eventType,
        psrId: eventData.psrId,
        crn: eventData.crn,
        messageId: response.MessageId,
        queueUrl: config.domainEvents.sqs.queueUrl,
      })
    } catch (error) {
      logger.error('DomainEventService: Failed to publish domain event to SQS', {
        eventType: event.eventType,
        psrId: eventData.psrId,
        crn: eventData.crn,
        queueUrl: config.domainEvents.sqs.queueUrl,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        errorType: error?.constructor?.name,
        errorCode: error && typeof error === 'object' && 'code' in error ? error.code : undefined,
        errorName: error && typeof error === 'object' && 'name' in error ? error.name : undefined,
      })
      throw error
    }
  }
}
