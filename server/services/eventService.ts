import { SNSClient, PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns'
import { fromTokenFile } from '@aws-sdk/credential-provider-web-identity'
import logger from '../../logger'
import config from '../config'

export interface IReportEventData {
  reportId: string
  eventNumber: string
  crn: string
  reportStatus: string
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
  private snsClient = new SNSClient({
    endpoint: config.aws.sns.endpoint || undefined,
    region: config.aws.sns.region,
    credentials:
      process.env.AWS_ROLE_ARN && process.env.AWS_WEB_IDENTITY_TOKEN_FILE
        ? fromTokenFile({
            roleArn: process.env.AWS_ROLE_ARN,
            webIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE,
          })
        : undefined,
  })

  public sendReportEvent = async (reportEventData: IReportEventData): Promise<PublishCommandOutput> => {
    const domainEvent: IDomainEvent = {
      eventType: `pre-sentence.report.${reportEventData.reportStatus}`,
      version: config.aws.sns.eventVersion,
      description: `A Pre-Sentence Report has been ${reportEventData.reportStatus}`,
      detailUrl: `${config.domain}/api/v1/report/${reportEventData.reportId}`,
      occurredAt: new Date().toISOString(),
      additionalInformation: { eventNumber: reportEventData.eventNumber, reportId: reportEventData.reportId },
      personReference: { identifiers: [{ type: 'CRN', value: reportEventData.crn }] },
    }

    let result!: PublishCommandOutput

    try {
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

      result = await this.snsClient.send(command)

      logger.info(`Message ${result.MessageId} sent to the topic.`)
    } catch (e) {
      logger.error(`Message ${domainEvent.eventType} for report ${reportEventData.reportId} failed.`, e)
    }

    return result
  }
}
