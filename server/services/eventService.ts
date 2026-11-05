import { SNSClient, PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns'
import { fromTokenFile } from '@aws-sdk/credential-provider-web-identity'
import logger from '../../logger'
import { LogDependency, LogEvent, LogOperation } from '../utils/logging'
import config from '../config'

export interface IReportEventData {
  reportId: string
  eventNumber: string
  crn: string
  reportStatus: string
  username: string
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
    psrId: string
    username: string
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
    logger.info(
      {
        region: config.aws.sns.region,
        hasTopicArn: !!config.aws.sns.topicArn,
        topicArn: config.aws.sns.topicArn || 'NOT_SET',
        hasEndpoint: !!config.aws.sns.endpoint,
        endpoint: config.aws.sns.endpoint || 'not set (using AWS default)',
        eventVersion: config.aws.sns.eventVersion,
        hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
        awsRoleArn: process.env.AWS_ROLE_ARN || 'NOT_SET',
        awsWebIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE || 'NOT_SET',
      },
      'EventService: Initializing service'
    )

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
      logger.info(
        {
          endpoint: snsConfig.endpoint,
        },
        'EventService: Using custom SNS endpoint'
      )
    }

    // Use IRSA credentials if available (for Cloud Platform)
    if (process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE) {
      snsConfig.credentials = fromTokenFile({
        roleArn: process.env.AWS_ROLE_ARN,
        webIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE,
      })
      logger.info(
        {
          roleArn: process.env.AWS_ROLE_ARN,
        },
        'EventService: Using IRSA credentials'
      )
    }

    this.snsClient = new SNSClient(snsConfig)
    logger.info('EventService: SNS client initialized successfully')
  }

  public sendReportEvent = async (reportEventData: IReportEventData): Promise<PublishCommandOutput> => {
    logger.info(
      {
        reportId: reportEventData.reportId,
        eventNumber: reportEventData.eventNumber,
        crn: reportEventData.crn,
        reportStatus: reportEventData.reportStatus,
        hasPdfUrl: !!reportEventData.pdfUrl,
        pdfUrl: reportEventData.pdfUrl || 'NOT_PROVIDED',
      },
      'EventService: Building domain event'
    )

    const domainEvent: IDomainEvent = {
      eventType: `pre-sentence.report.${reportEventData.reportStatus}`,
      version: config.aws.sns.eventVersion,
      description: `A Pre-Sentence Report has been ${reportEventData.reportStatus}`,
      detailUrl: reportEventData.pdfUrl || `${config.domain}/api/v1/report/${reportEventData.reportId}`,
      occurredAt: new Date().toISOString(),
      additionalInformation: {
        eventNumber: reportEventData.eventNumber,
        reportId: reportEventData.reportId,
        psrId: reportEventData.reportId,
        username: reportEventData.username,
      },
      personReference: { identifiers: [{ type: 'CRN', value: reportEventData.crn }] },
    }

    logger.info(
      {
        eventType: domainEvent.eventType,
        version: domainEvent.version,
        detailUrl: domainEvent.detailUrl,
        reportId: reportEventData.reportId,
        crn: reportEventData.crn,
        occurredAt: domainEvent.occurredAt,
      },
      'EventService: Domain event structure created'
    )

    let result!: PublishCommandOutput

    try {
      logger.info(
        {
          topicArn: config.aws.sns.topicArn,
          region: config.aws.sns.region,
          hasEndpoint: !!config.aws.sns.endpoint,
          endpoint: config.aws.sns.endpoint || 'default',
          messageSize: JSON.stringify(domainEvent).length,
          hasIRSACredentials: !!(process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE),
          eventType: domainEvent.eventType,
        },
        'EventService: Preparing SNS message'
      )

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

      logger.info(
        {
          reportId: reportEventData.reportId,
          eventType: domainEvent.eventType,
        },
        'EventService: Sending message to SNS'
      )

      result = await this.snsClient.send(command)

      logger.info(
        {
          dependency: LogDependency.Sns,
          operation: LogOperation.Publish,
          eventType: domainEvent.eventType,
          reportId: reportEventData.reportId,
          crn: reportEventData.crn,
          messageId: result.MessageId,
          topicArn: config.aws.sns.topicArn,
        },
        'EventService: Domain event published successfully to SNS'
      )
    } catch (e) {
      let errorCode: string | undefined
      if (e !== null && typeof e === 'object' && 'code' in e) {
        if (typeof e.code === 'string') {
          errorCode = e.code
        }
      }

      logger.error(
        {
          event: LogEvent.DependencyFailed,
          dependency: LogDependency.Sns,
          operation: LogOperation.Publish,
          eventType: domainEvent.eventType,
          errorName: e instanceof Error ? e.name : undefined,
          errorCode,
        },
        'Failed to publish domain event to SNS'
      )

      throw e
    }

    return result
  }
}
