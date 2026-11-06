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
    mockReportService.updateFieldValues = jest.fn().mockResolvedValue(null)
    mockReportService.updateReport = jest.fn().mockResolvedValue(null)
    mockReportService.getSourcesOfInformation = jest.fn().mockResolvedValue([])
    mockReportService.persistPartialFieldValues = jest.fn().mockResolvedValue({ persisted: [], dropped: [] })

    controller = new OffenceAnalysisController(mockReportService, mockPreSentenceToDeliusService)
  })

  describe('beforeRender hook', () => {
    it('seeds offences from the API and persists them when none are stored', async () => {
      mockPreSentenceToDeliusService.getOffences.mockResolvedValue(mockApiOffenceDetails)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-123')
      expect(mockReportService.updateFieldValues).toHaveBeenCalledWith('report-123', [
        {
          pageName: 'edit-offences',
          questionId: 0,
          questionValue: 'mainOffence',
          answer: 'Criminal damage to property - 12/04/2024',
        },
        {
          pageName: 'edit-offences',
          questionId: 1,
          questionValue: 'additionalOffences',
          answer: 'Assault on emergency worker - 12/04/2024\nPossession of class A drugs - 12/04/2024',
        },
      ])
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            offences: {
              mainOffence: 'Criminal damage to property - 12/04/2024',
              additionalOffences: [
                'Assault on emergency worker - 12/04/2024',
                'Possession of class A drugs - 12/04/2024',
              ],
            },
            offencesAvailable: true,
          }),
        })
      )
    })

    it('uses stored offences and does not call the API when offences are already stored', async () => {
      mockReportService.getReportById = jest.fn().mockResolvedValue({
        ...mockReport,
        pages: [
          {
            name: 'edit-offences',
            questions: [
              { id: 0, value: 'mainOffence', answer: 'Edited offence - 01/01/2026' },
              { id: 1, value: 'additionalOffences', answer: '' },
            ],
          },
        ],
      })
      controller = new OffenceAnalysisController(mockReportService, mockPreSentenceToDeliusService)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
      expect(mockReportService.updateFieldValues).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            offences: { mainOffence: 'Edited offence - 01/01/2026', additionalOffences: [] },
            offencesAvailable: true,
          }),
        })
      )
    })

    it('handles API errors gracefully when nothing is stored', async () => {
      mockPreSentenceToDeliusService.getOffences.mockRejectedValue(new Error('API Error'))

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateFieldValues).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({ offencesAvailable: false }),
        })
      )
    })

    it('should work without PreSentenceToDeliusService injected', async () => {
      const controllerWithoutService = new OffenceAnalysisController(mockReportService)

      await controllerWithoutService.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.render).toHaveBeenCalled()
    })
  })

  describe('post method', () => {
    it('should re-render with validation errors when offencesUnderConsideration exceeds 20,000 characters', async () => {
      mockRequest.body = {
        offencesUnderConsideration: 'a'.repeat(20_001),
        offencesPattern: 'Pattern analysis',
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          formValidation: expect.objectContaining({
            isValid: false,
            errors: expect.objectContaining({
              offencesUnderConsideration: 'Offences under consideration must be 20,000 characters or less',
            }),
          }),
        })
      )
    })
  })
})
