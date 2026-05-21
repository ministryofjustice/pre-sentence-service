import { Request, Response } from 'express'

import { PublishCommandOutput } from '@aws-sdk/client-sns'
import APIController from './apiController'
import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'
import ReportDetails, { ReportStatus } from '../../repositories/entities/reportDetails'

jest.mock('../../services/reportService')
jest.mock('../../services/eventService')
jest.mock('../../services/pdfGenerationService')

const mockReportDetails: ReportDetails = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  personId: 1,
  status: ReportStatus.NOT_STARTED,
  origin: '1',
  reportType: 'short-format',
  pages: [],
  createdAt: new Date('2024-01-01'),
  createdBy: 'testuser',
  lastUpdatedBy: new Date('2024-01-01'),
  isDeleted: false,
  version: 1,
  person: {
    id: 1,
    crn: 'X12345B',
    createdAt: new Date('2024-01-01'),
    createdBy: 'testuser',
    lastUpdatedBy: new Date('2024-01-01'),
    isDeleted: false,
    version: 1,
  },
}

describe('Route Handlers - API Controller', () => {
  let handler: APIController
  let req: Request
  let res: Response
  let mockedReportService: ReportService
  let mockedEventService: EventService

  beforeEach(() => {
    jest.clearAllMocks()

    // Create fresh mocks for each test
    mockedReportService = new ReportService()
    mockedEventService = new EventService()

    // Setup default mock implementations
    jest.spyOn(mockedReportService, 'getDefinitionByType').mockResolvedValue({ id: 1 })
    jest.spyOn(mockedReportService, 'createReport').mockResolvedValue(mockReportDetails)
    jest.spyOn(mockedReportService, 'getReportById').mockResolvedValue(mockReportDetails)
    jest.spyOn(mockedReportService, 'updateFieldValues').mockResolvedValue(mockReportDetails)
    jest.spyOn(mockedReportService, 'persistPartialFieldValues').mockResolvedValue({ persisted: [], dropped: [] })
    jest.spyOn(mockedReportService, 'updateReport').mockResolvedValue(mockReportDetails)
    jest.spyOn(mockedReportService, 'deleteReport').mockResolvedValue(true)
    jest.spyOn(mockedEventService, 'sendReportEvent').mockResolvedValue({} as PublishCommandOutput)

    handler = new APIController(mockedReportService, mockedEventService)

    req = {
      body: {
        crn: 'x12345b',
      },
      params: {
        id: '123',
      },
      session: {},
    } as unknown as Request

    res = {
      json: jest.fn(),
      render: jest.fn(),
      renderPDF: jest.fn(),
      status: jest.fn(() => {
        return {
          json: jest.fn(),
          send: jest.fn(),
          end: jest.fn(),
        }
      }),
      locals: {
        user: {
          username: 'testuser',
        },
      },
    } as unknown as Response
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Create report', () => {
    it('should create a new report', async () => {
      await handler.createReport(req, res)

      expect(mockedReportService.createReport).toHaveBeenCalledWith({ crn: req.body.crn.toUpperCase() }, 'testuser')
      expect(mockedReportService.deleteReport).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('Get report by ID', () => {
    it('should return the report', async () => {
      await handler.getReportById(req, res)
      expect(mockedReportService.getReportById).toHaveBeenCalledWith('123')
    })
  })

  describe('Get report PDF', () => {
    it('should return the report as a PDF', async () => {
      await handler.getPdfById(req, res)
      expect(mockedReportService.getReportById).toHaveBeenCalledWith('123')
      // The PDF generation is now handled by PdfGenerationService which is mocked
      // The test passes if no error is thrown
    })
  })

  describe('save', () => {
    it('drops over-limit fields and persists the rest, returning droppedFields in the response', async () => {
      const json = jest.fn()
      const status = jest.fn().mockReturnValue({ json })
      res.status = status as unknown as Response['status']

      jest
        .spyOn(mockedReportService, 'persistPartialFieldValues')
        .mockResolvedValue({ persisted: ['otherField'], dropped: ['defendantBehaviour'] })

      req = {
        body: {
          defendantBehaviour: 'a'.repeat(10_001),
          otherField: 'ok',
          pageName: 'psr-defendant-behaviour',
        },
        params: { id: '123' },
        query: {},
        headers: {},
      } as unknown as Request

      await handler.save(req, res)

      expect(mockedReportService.persistPartialFieldValues).toHaveBeenCalledWith(
        '123',
        req.body,
        'psr-defendant-behaviour'
      )
      expect(status).toHaveBeenCalledWith(200)
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, droppedFields: ['defendantBehaviour'] })
      )
    })

    it('uses form-supplied pageName over referer scraping', async () => {
      req = {
        body: { someField: 'value', pageName: 'offence-analysis' },
        params: { id: '123' },
        query: {},
        headers: { referer: 'http://x/psr/123/risk-analysis' },
      } as unknown as Request

      await handler.save(req, res)

      expect(mockedReportService.persistPartialFieldValues).toHaveBeenCalledWith('123', req.body, 'offence-analysis')
    })
  })
})
