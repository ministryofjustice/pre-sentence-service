import { SNS } from 'aws-sdk'
import { SendMessageResult } from 'aws-sdk/clients/sqs'

import logger from '../../logger'
import config from '../config'

export interface IReportEventData {
  reportId: string
  entityId: string
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
    entityId: string
    reportId: string
  }
  personReference: {
    identifiers: [
      {
        type: string
        value: string
      }
    ]
  }
}

export default class EventService {
  private sns = new SNS({
    endpoint: config.aws.sns.endpoint,
    region: config.aws.sns.region,
    accessKeyId: config.aws.sns.accessKeyId,
    secretAccessKey: config.aws.sns.secretAccessKey,
  })

  public sendReportEvent = async (reportEventData: IReportEventData): Promise<SendMessageResult> => {
    const domainEvent: IDomainEvent = {
      eventType: `pre-sentence.report.${reportEventData.reportStatus}`,
      version: config.aws.sns.eventVersion,
      description: `A Pre-Sentence Report has been ${reportEventData.reportStatus}`,
      detailUrl: `${config.domain}/api/v1/report/${reportEventData.reportId}`,
      occurredAt: new Date().toISOString(),
      additionalInformation: { entityId: reportEventData.entityId, reportId: reportEventData.reportId },
      personReference: { identifiers: [{ type: 'CRN', value: reportEventData.crn }] },
    }

    let result: SendMessageResult

    try {
      result = await this.sns
        .publish({
          Message: JSON.stringify(domainEvent),
          TopicArn: config.aws.sns.topicArn,
        })
        .promise()

      logger.info(`Message ${result.MessageId} sent to the topic.`)
    } catch (e) {
      logger.error(`Message ${domainEvent.eventType} for report ${reportEventData.reportId} failed.`, e)
    }

    return result
  }
}
