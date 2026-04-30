import { Request, Response } from 'express'
import OffenceAnalysisController from './offence-analysis-controller'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import type { OffenceDetails } from '../../@types/preSentenceToDelius'

jest.mock('../../services/reportService')
jest.mock('../../services/preSentenceToDeliusService')
jest.mock('../../../logger')

describe('OffenceAnalysisController', () => {
  let controller: OffenceAnalysisController
  let mockReportService: jest.Mocked<ReportService>
  let mockPreSentenceToDeliusService: jest.Mocked<PreSentenceToDeliusService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  const mockReport = {
    id: 'report-123',
    personId: 1,
    origin: '12345',
    reportType: 'PSR',
    status: 'NOT_STARTED',
    pages: [],
    createdAt: new Date(),
    createdBy: 'test-user',
    lastUpdatedBy: new Date(),
    isDeleted: false,
    person: {
      id: 1,
      crn: 'X123456',
      createdAt: new Date(),
      createdBy: 'test-user',
      lastUpdatedBy: new Date(),
      isDeleted: false,
    },
  }

  const mockApiOffenceDetails: OffenceDetails = {
    mainOffence: {
      date: '2024-04-12',
      mainCategory: {
        code: '030',
        description: 'Criminal damage',
      },
      subCategory: {
        code: '03001',
        description: 'Criminal damage to property',
      },
    },
    additionalOffences: [
      {
        date: '2024-04-12',
        mainCategory: {
          code: '020',
          description: 'Violence',
        },
        subCategory: {
          code: '02004',
          description: 'Assault on emergency worker',
        },
      },
      {
        date: '2024-04-12',
        mainCategory: {
          code: '060',
          description: 'Drug offences',
        },
        subCategory: {
          code: '06001',
          description: 'Possession of class A drugs',
        },
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockReportService = new ReportService() as jest.Mocked<ReportService>
    mockPreSentenceToDeliusService = {
      getDefendantDetails: jest.fn(),
      getOffences: jest.fn(),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>

    mockRequest = {
      params: { reportId: 'report-123' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: {} as any,
      path: '/psr/report-123/offence-analysis',
      query: {},
    } as Partial<Request>

    mockResponse = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: {},
    } as Partial<Response>

    mockReportService.getReportById = jest.fn().mockResolvedValue(mockReport)

    controller = new OffenceAnalysisController(mockReportService, mockPreSentenceToDeliusService)
  })

  describe('beforeRender hook', () => {
    it('should fetch offence details from API and transform data', async () => {
      mockPreSentenceToDeliusService.getOffences.mockResolvedValue(mockApiOffenceDetails)

      await controller.get(mockRequest as Request, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-123')
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            offencesData: {
              mainOffence: {
                description: 'Criminal damage to property',
                code: '03001',
                date: '12/04/2024',
                isMainOffence: true,
              },
              additionalOffences: [
                {
                  description: 'Assault on emergency worker',
                  code: '02004',
                  date: '12/04/2024',
                  isMainOffence: false,
                },
                {
                  description: 'Possession of class A drugs',
                  code: '06001',
                  date: '12/04/2024',
                  isMainOffence: false,
                },
              ],
            },
            apiOffencesAvailable: true,
          }),
        })
      )
    })

    it('should handle API errors gracefully', async () => {
      mockPreSentenceToDeliusService.getOffences.mockRejectedValue(new Error('API Error'))

      await controller.get(mockRequest as Request, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-123')
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            apiOffencesAvailable: false,
          }),
        })
      )
    })

    it('should work without PreSentenceToDeliusService injected', async () => {
      const controllerWithoutService = new OffenceAnalysisController(mockReportService)

      await controllerWithoutService.get(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.render).toHaveBeenCalled()
    })
  })

  describe('post method', () => {
    it('should set noPreviousOffences to false if not provided', async () => {
      mockRequest.body = {
        offencesUnderConsideration: 'Some analysis',
        offencesPattern: 'Pattern analysis',
      }

      await controller.post(mockRequest as Request, mockResponse as Response)

      expect(mockRequest.body.noPreviousOffences).toBe('false')
    })

    it('should not modify noPreviousOffences if already provided', async () => {
      mockRequest.body = {
        offencesUnderConsideration: 'Some analysis',
        offencesPattern: 'Pattern analysis',
        noPreviousOffences: 'true',
      }

      await controller.post(mockRequest as Request, mockResponse as Response)

      expect(mockRequest.body.noPreviousOffences).toBe('true')
    })

    it('should re-render with validation errors when offencesUnderConsideration exceeds 10,000 characters', async () => {
      mockRequest.body = {
        offencesUnderConsideration: 'a'.repeat(10_001),
        offencesPattern: 'Pattern analysis',
        noPreviousOffences: 'true',
      }

      await controller.post(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          formValidation: expect.objectContaining({
            isValid: false,
            errors: expect.objectContaining({
              offencesUnderConsideration: 'Offences under consideration must be 10,000 characters or fewer',
            }),
          }),
        })
      )
    })
  })
})
