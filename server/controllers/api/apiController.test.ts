import { Request, Response } from 'express'

import { SendMessageResult } from 'aws-sdk/clients/sqs'
import APIController from './apiController'
import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'
import ReportDetails, { ReportStatus } from '../../repositories/entities/reportDetails'

jest.mock('../../services/reportService')
jest.mock('../../services/eventService')

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
    names: { foreName: 'John', middleName: '', surname: 'Doe' },
    dateOfBirth: new Date('1990-01-01'),
    pnc: 'PNC123',
    mainOffence: 'Theft',
    otherOffences: [],
    court: { name: 'Test Court', localJusticeArea: 'Test Area' },
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
    // Create fresh mocks for each test
    mockedReportService = new ReportService()
    mockedEventService = new EventService()

    // Setup default mock implementations
    jest.spyOn(mockedReportService, 'getDefinitionByType').mockResolvedValue({ id: 1 })
    jest.spyOn(mockedReportService, 'createReport').mockResolvedValue(mockReportDetails)
    jest.spyOn(mockedReportService, 'getReportById').mockResolvedValue(mockReportDetails)
    jest.spyOn(mockedReportService, 'updateFieldValues').mockResolvedValue(mockReportDetails)
    jest.spyOn(mockedReportService, 'deleteReport').mockResolvedValue(true)
    jest.spyOn(mockedEventService, 'sendReportEvent').mockResolvedValue({} as SendMessageResult)

    handler = new APIController(mockedReportService, mockedEventService)

    req = {
      body: {
        crn: 'x12345b',
        eventNumber: 1,
        names: {
          foreName: 'John',
          middleName: '',
          surname: 'Doe',
        },
        dateOfBirth: '1990-01-01',
        pnc: 'PNC123',
        mainOffence: 'Theft',
        court: {
          name: 'Test Court',
          localJusticeArea: 'Test Area',
        },
      },
      params: {
        id: '123',
        reportType: 'short-format',
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

      expect(mockedReportService.createReport).toHaveBeenCalledWith(
        expect.objectContaining({
          crn: req.body.crn.toUpperCase(),
          eventNumber: req.body.eventNumber.toString(),
          reportType: 'short-format',
        }),
        'testuser'
      )
      expect(mockedEventService.sendReportEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventNumber: '1',
          crn: req.body.crn.toUpperCase(),
          reportStatus: 'started',
        })
      )
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
      expect(res.renderPDF).toHaveBeenCalled()
    })
  })
})
