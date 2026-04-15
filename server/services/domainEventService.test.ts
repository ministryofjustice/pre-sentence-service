import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import DomainEventService, { PSRCompletedEventData } from './domainEventService'

// Mock AWS SDK
jest.mock('@aws-sdk/client-sqs')

describe('DomainEventService', () => {
  let service: DomainEventService
  let mockSend: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockSend = jest.fn()
    ;(SQSClient as jest.Mock).mockImplementation(() => ({
      send: mockSend,
    }))
    service = new DomainEventService()
  })

  describe('publishPSRCompletedEvent', () => {
    it('should publish a PSR completed event with correct structure', async () => {
      const eventData: PSRCompletedEventData = {
        psrId: '00000000-0000-0000-0000-000000000001',
        crn: 'X012771',
        username: 'TestUser',
        pdfUrl: 'http://localhost:3000/pre-sentence-report/pdf/00000000-0000-0000-0000-000000000001',
      }

      mockSend.mockResolvedValue({ MessageId: 'test-message-id' })

      await service.publishPSRCompletedEvent(eventData)

      // Verify the SQS send method was called
      expect(mockSend).toHaveBeenCalledTimes(1)
      expect(mockSend).toHaveBeenCalledWith(expect.any(SendMessageCommand))
    })

    it('should throw error when SQS send fails', async () => {
      const eventData: PSRCompletedEventData = {
        psrId: '00000000-0000-0000-0000-000000000001',
        crn: 'X012771',
        username: 'TestUser',
        pdfUrl: 'http://localhost:3000/pre-sentence-report/pdf/00000000-0000-0000-0000-000000000001',
      }

      mockSend.mockRejectedValue(new Error('SQS error'))

      await expect(service.publishPSRCompletedEvent(eventData)).rejects.toThrow('SQS error')
    })
  })
})
