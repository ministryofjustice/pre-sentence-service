import { SQS } from 'aws-sdk'
import { SendMessageRequest, SendMessageResult } from 'aws-sdk/clients/sqs'

import logger from '../../logger'
import config from '../config'

export interface ReportEventData {
  reportId: string
  entityId: string
  crn: string
  reportStatus: string
}

export interface DomainEvent {
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
  private sqs = new SQS({
    region: config.sqs.domainEvents.region,
    accessKeyId: config.sqs.domainEvents.accessKeyId,
    secretAccessKey: config.sqs.domainEvents.secretAccessKey,
  })

  private sendMessageRequest: SendMessageRequest = {
    QueueUrl: config.sqs.domainEvents.queueUrl,
    MessageBody: '',
  }

  public sendReportEvent = async (reportEventData: ReportEventData): Promise<SendMessageResult> => {
    const domainEvent: DomainEvent = {
      eventType: `pre-sentence-service.report.${reportEventData.reportStatus}`,
      version: config.sqs.domainEvents.eventVersion,
      description: `A Pre-Sentence Report has been ${reportEventData.reportStatus}`,
      detailUrl: `${config.domain}/${reportEventData.reportId}/pdf`,
      occurredAt: new Date().toISOString(),
      additionalInformation: { entityId: reportEventData.entityId, reportId: reportEventData.reportId },
      personReference: { identifiers: [{ type: 'CRN', value: reportEventData.crn }] },
    }

    let result: SendMessageResult

    try {
      result = await this.sqs
        .sendMessage({
          ...this.sendMessageRequest,
          MessageBody: JSON.stringify(domainEvent),
        })
        .promise()
      logger.info(`Message ${result.MessageId} placed in the queue.`)
    } catch (e) {
      logger.error(`Message ${domainEvent.eventType} for report ${reportEventData.reportId} failed.`, e)
    }

    return result
  }
}
