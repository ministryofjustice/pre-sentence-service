import { Request, Response } from 'express'
import DefendantDetailsController from './defendant-details-controller'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import type { DefendantDetails as DefendantDetailsApiResponse } from '../../@types/preSentenceToDelius'

jest.mock('../../services/reportService')
jest.mock('../../services/preSentenceToDeliusService')
jest.mock('../../../logger')

describe('DefendantDetailsController', () => {
  let controller: DefendantDetailsController
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

  const mockApiDefendantDetails: DefendantDetailsApiResponse = {
    crn: 'X123456',
    eventNumber: 12345,
    name: {
      forename: 'Jane',
      middleName: 'Mary',
      surname: 'Smith',
    },
    dateOfBirth: '1992-03-20',
    mainAddress: {
      buildingName: 'Flat 5',
      buildingNumber: '42',
      streetName: 'High Street',
      district: 'Camden',
      town: 'London',
      county: 'Greater London',
      postcode: 'NW1 2AB',
    },
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
      path: '/psr/report-123/defendant-details',
      query: {},
    } as Partial<Request>

    mockResponse = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: {},
    } as Partial<Response>

    mockReportService.getReportById = jest.fn().mockResolvedValue(mockReport)

    controller = new DefendantDetailsController(mockReportService, mockPreSentenceToDeliusService)
  })

  it('fetches defendant details from the API and flattens them into the template data', async () => {
    mockPreSentenceToDeliusService.getDefendantDetails.mockResolvedValue(mockApiDefendantDetails)

    await controller.get(mockRequest as Request, mockResponse as Response)

    expect(mockPreSentenceToDeliusService.getDefendantDetails).toHaveBeenCalledWith('report-123')
    expect(mockResponse.render).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        data: expect.objectContaining({
          apiDefendantDetailsAvailable: true,
          name: 'Jane Mary Smith',
          dateOfBirth: new Date('1992-03-20'),
          crn: 'X123456',
          'address-buildingName': 'Flat 5',
          'address-number': '42',
          'address-streetName': 'High Street',
          'address-town': 'London',
          'address-district': 'Camden',
          'address-county': 'Greater London',
          'address-postcode': 'NW1 2AB',
        }),
      })
    )
  })

  it('marks defendant details unavailable when the API call fails', async () => {
    mockPreSentenceToDeliusService.getDefendantDetails.mockRejectedValue(new Error('API Error'))

    await controller.get(mockRequest as Request, mockResponse as Response)

    expect(mockPreSentenceToDeliusService.getDefendantDetails).toHaveBeenCalledWith('report-123')
    expect(mockResponse.render).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        data: expect.objectContaining({
          apiDefendantDetailsAvailable: false,
          crn: 'X123456',
        }),
      })
    )
  })

  it('renders with defendant details unavailable when no API service is injected', async () => {
    const controllerWithoutService = new DefendantDetailsController(mockReportService)

    await controllerWithoutService.get(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.render).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        data: expect.objectContaining({
          apiDefendantDetailsAvailable: false,
          crn: 'X123456',
        }),
      })
    )
  })
})
