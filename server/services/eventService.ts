import { SNSClient, PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns'
import { fromTokenFile } from '@aws-sdk/credential-provider-web-identity'
import logger from '../../logger'
import config from '../config'

export interface IReportEventData {
  reportId: string
  eventNumber: string
  crn: string
  reportStatus: string
  pdfUrl?: string
}

export interface IDomainEvent {
  eventType: string
  version: number
  description: string
  detailUrl: string
  occurredAt: string
  additionalInformation: {
    eventNumber: string
    reportId: string
  }
  personReference: {
    identifiers: [
      {
        type: string
        value: string
      },
    ]
  }
}

export default class EventService {
  private snsClient: SNSClient

  constructor() {
    logger.info('EventService: Initializing service', {
      region: config.aws.sns.region,
      hasTopicArn: !!config.aws.sns.topicArn,
      topicArn: config.aws.sns.topicArn || 'NOT_SET',
      hasEndpoint: !!config.aws.sns.endpoint,
      endpoint: config.aws.sns.endpoint || 'not set (using AWS default)',
      eventVersion: config.aws.sns.eventVersion,
      hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
      awsRoleArn: process.env.AWS_ROLE_ARN || 'NOT_SET',
      awsWebIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE || 'NOT_SET',
    })

    const snsConfig: {
      region: string
      endpoint?: string
      credentials?: ReturnType<typeof fromTokenFile>
    } = {
      region: config.aws.sns.region,
    }

    // Only set endpoint for local development
    if (config.aws.sns.endpoint) {
      snsConfig.endpoint = config.aws.sns.endpoint
      logger.info('EventService: Using custom SNS endpoint', {
        endpoint: snsConfig.endpoint,
      })
    }

    // Use IRSA credentials if available (for Cloud Platform)
    if (process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE) {
      snsConfig.credentials = fromTokenFile({
        roleArn: process.env.AWS_ROLE_ARN,
        webIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE,
      })
      logger.info('EventService: Using IRSA credentials', {
        roleArn: process.env.AWS_ROLE_ARN,
      })
    }

    this.snsClient = new SNSClient(snsConfig)
    logger.info('EventService: SNS client initialized successfully')
  }

  public sendReportEvent = async (reportEventData: IReportEventData): Promise<PublishCommandOutput> => {
    logger.info('EventService: Building domain event', {
      reportId: reportEventData.reportId,
      eventNumber: reportEventData.eventNumber,
      crn: reportEventData.crn,
      reportStatus: reportEventData.reportStatus,
      hasPdfUrl: !!reportEventData.pdfUrl,
      pdfUrl: reportEventData.pdfUrl || 'NOT_PROVIDED',
    })

    const domainEvent: IDomainEvent = {
      eventType: `pre-sentence.report.${reportEventData.reportStatus}`,
      version: config.aws.sns.eventVersion,
      description: `A Pre-Sentence Report has been ${reportEventData.reportStatus}`,
      detailUrl: reportEventData.pdfUrl || `${config.domain}/api/v1/report/${reportEventData.reportId}`,
      occurredAt: new Date().toISOString(),
      additionalInformation: { eventNumber: reportEventData.eventNumber, reportId: reportEventData.reportId },
      personReference: { identifiers: [{ type: 'CRN', value: reportEventData.crn }] },
    }

    logger.info('EventService: Domain event structure created', {
      eventType: domainEvent.eventType,
      version: domainEvent.version,
      detailUrl: domainEvent.detailUrl,
      reportId: reportEventData.reportId,
      crn: reportEventData.crn,
      occurredAt: domainEvent.occurredAt,
    })

    let result!: PublishCommandOutput

    try {
      logger.info('EventService: Preparing SNS message', {
        topicArn: config.aws.sns.topicArn,
        region: config.aws.sns.region,
        hasEndpoint: !!config.aws.sns.endpoint,
        endpoint: config.aws.sns.endpoint || 'default',
        messageSize: JSON.stringify(domainEvent).length,
        hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
        eventType: domainEvent.eventType,
      })

      const command = new PublishCommand({
        Message: JSON.stringify(domainEvent),
        MessageAttributes: {
          eventType: {
            DataType: 'String',
            StringValue: domainEvent.eventType,
          },
        },
        TopicArn: config.aws.sns.topicArn,
      })

      logger.info('EventService: Sending message to SNS', {
        reportId: reportEventData.reportId,
        eventType: domainEvent.eventType,
      })

      result = await this.snsClient.send(command)

      logger.info('EventService: Domain event published successfully to SNS', {
        eventType: domainEvent.eventType,
        reportId: reportEventData.reportId,
        crn: reportEventData.crn,
        messageId: result.MessageId,
        topicArn: config.aws.sns.topicArn,
      })
    } catch (e) {
      logger.error('EventService: Failed to publish domain event to SNS', {
        eventType: domainEvent.eventType,
        reportId: reportEventData.reportId,
        crn: reportEventData.crn,
        topicArn: config.aws.sns.topicArn,
        error: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined,
        errorType: e?.constructor?.name,
        errorCode: e && typeof e === 'object' && 'code' in e ? e.code : undefined,
        errorName: e && typeof e === 'object' && 'name' in e ? e.name : undefined,
      })
      throw e
    }

    return result
  }
}
