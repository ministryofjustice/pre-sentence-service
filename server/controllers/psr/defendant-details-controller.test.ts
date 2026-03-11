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
      names: {
        foreName: 'John',
        middleName: 'Middle',
        surname: 'Doe',
      },
      dateOfBirth: new Date('1990-01-15'),
      pnc: 'PNC123',
      address: {
        noFixedAbode: false,
        buildingNumber: '10',
        addressNumber: '',
        streetName: 'Main Street',
        town: 'London',
        district: 'Westminster',
        county: 'Greater London',
        postcode: 'SW1A 1AA',
      },
      mainOffence: 'Theft',
      court: {
        name: 'Westminster Magistrates Court',
        localJusticeArea: 'Westminster',
      },
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

  describe('beforeRender hook', () => {
    it('should fetch defendant details from API and transform data', async () => {
      mockPreSentenceToDeliusService.getDefendantDetails.mockResolvedValue(mockApiDefendantDetails)

      await controller.get(mockRequest as Request, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getDefendantDetails).toHaveBeenCalledWith('report-123')
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
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
            apiDataAvailable: true,
          }),
        })
      )
    })

    it('should handle API errors gracefully and fall back to database data', async () => {
      mockPreSentenceToDeliusService.getDefendantDetails.mockRejectedValue(new Error('API Error'))

      await controller.get(mockRequest as Request, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getDefendantDetails).toHaveBeenCalledWith('report-123')
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'John Doe',
            crn: 'X123456',
            apiDataAvailable: false,
          }),
        })
      )
    })

    it('should work without PreSentenceToDeliusService injected', async () => {
      const controllerWithoutService = new DefendantDetailsController(mockReportService)

      await controllerWithoutService.get(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'John Doe',
            crn: 'X123456',
          }),
        })
      )
    })

    it('should not fetch API data if reportId is missing', async () => {
      mockRequest.params = {}
      mockRequest.query = {}

      await controller.get(mockRequest as Request, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getDefendantDetails).not.toHaveBeenCalled()
    })
  })
})
