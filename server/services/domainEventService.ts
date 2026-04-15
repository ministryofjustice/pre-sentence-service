import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
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
    const sqsConfig: { region: string; endpoint?: string } = {
      region: config.domainEvents.sqs.region,
    }

    // Only set endpoint for local development with localstack
    if (config.domainEvents.sqs.endpoint) {
      sqsConfig.endpoint = config.domainEvents.sqs.endpoint
    }

    this.sqsClient = new SQSClient(sqsConfig)
  }

  async publishPSRCompletedEvent(eventData: PSRCompletedEventData): Promise<void> {
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

    try {
      const command = new SendMessageCommand({
        QueueUrl: config.domainEvents.sqs.queueUrl,
        MessageBody: JSON.stringify(event),
      })

      const response = await this.sqsClient.send(command)

      logger.info('Domain event published successfully', {
        eventType: event.eventType,
        psrId: eventData.psrId,
        messageId: response.MessageId,
      })
    } catch (error) {
      logger.error('Failed to publish domain event', {
        eventType: event.eventType,
        psrId: eventData.psrId,
        error: error instanceof Error ? error.message : String(error),
      })
      throw error
    }
  }
}
