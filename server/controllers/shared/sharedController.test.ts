import { Request, Response } from 'express'

import SharedController from './sharedController'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import type { DefendantDetails as DefendantDetailsApiResponse } from '../../@types/preSentenceToDelius'
import { mockedReportData } from '../../services/__mocks__/reportService'
import validateUUID from '../../utils/reportValidation'

jest.mock('../../services/reportService')
jest.mock('../../services/communityService')
jest.mock('../../utils/reportValidation')

describe('Route Handlers - Shared Controller', () => {
  const validateUUIDMock = validateUUID as jest.MockedFunction<(uuid: string) => boolean>
  const sourcesOfInformation = [
    {
      isCustom: false,
      key: 'cps_summary',
      value: 'CPS summary',
    },
  ]
  const mockedReportService = {
    getSourcesOfInformation: jest.fn().mockResolvedValue(sourcesOfInformation),
    saveCustomSourcesOfInformation: jest.fn().mockResolvedValue(undefined),
    getReportById: jest.fn().mockResolvedValue(mockedReportData),
    updateReport: jest.fn().mockResolvedValue(mockedReportData),
    updateFieldValues: jest.fn().mockResolvedValue(mockedReportData),
  } as unknown as ReportService

  const mockApiDefendantDetails: DefendantDetailsApiResponse = {
    crn: 'X123456',
    eventNumber: 12345,
    name: { forename: 'Jane', middleName: '', surname: 'Doe' },
    dateOfBirth: '1990-01-01',
    mainAddress: { postcode: 'SW1A 1AA' },
  }

  const mockPreSentenceToDeliusService = {
    getDefendantDetails: jest.fn().mockResolvedValue(mockApiDefendantDetails),
    getOffences: jest.fn(),
  } as unknown as jest.Mocked<PreSentenceToDeliusService>

  let handler: SharedController
  let req: Request
  let res: Response

  beforeAll(() => {
    handler = new SharedController(mockedReportService, mockPreSentenceToDeliusService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {
        reportId: '123',
      },
      body: {},
      session: {},
      path: '',
      query: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: {
        user: {
          username: 'testuser',
        },
      },
    } as unknown as Response

    validateUUIDMock.mockReturnValue(true)
  })

  describe('values', () => {
    it('should declare path as string', async () => {
      expect(typeof handler.path).toEqual('string')
      expect(handler.path.length).toEqual(0)
    })

    it('should declare default templateValues', async () => {
      expect(typeof handler.templateValues).toBe('object')
      expect(typeof handler.templateValues.preSentenceType).toEqual('string')
      expect(handler.templateValues.preSentenceType.length).toEqual(0)
    })

    it('should declare empty template path', async () => {
      expect(typeof handler.templatePath).toBe('string')
      expect(handler.templatePath.length).toBe(0)
    })

    it('should declare empty redirect path', async () => {
      expect(typeof handler.redirectPath).toBe('string')
      expect(handler.redirectPath.length).toBe(0)
    })
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      const { reportId } = req.params
      expect(res.render).toHaveBeenCalledWith(
        `${handler.path}/${handler.templatePath}`,
        expect.objectContaining({
          reportId,
          isEditing: false,
        })
      )
    })

    it('should derive section statuses from API defendant details and saved page answers', async () => {
      mockedReportService.getReportById = jest.fn().mockResolvedValue({
        ...mockedReportData,
        pages: [
          {
            name: 'offence-analysis',
            questions: [
              { id: 0, value: 'offencesUnderConsideration', answer: 'Some analysis' },
              { id: 1, value: 'noPreviousOffences', answer: 'true' },
            ],
          },
        ],
      })

      await handler.get(req, res)

      expect(res.render).toHaveBeenCalledWith(
        `${handler.path}/${handler.templatePath}`,
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'Jane Doe',
            offencesUnderConsideration: 'Some analysis',
            noPreviousOffences: 'true',
            sectionStatuses: expect.objectContaining({
              defendantDetails: expect.objectContaining({
                status: 'Completed',
                name: true,
                dateOfBirth: true,
                address: true,
              }),
              offenceAnalysis: expect.objectContaining({
                status: 'Completed',
                offencesUnderConsideration: true,
                offencesPattern: true,
              }),
              riskAnalysis: expect.objectContaining({
                status: 'Incomplete',
              }),
            }),
          }),
        })
      )
    })

    it('marks the defendant details section incomplete when the API call fails', async () => {
      mockPreSentenceToDeliusService.getDefendantDetails.mockRejectedValueOnce(new Error('API down'))
      mockedReportService.getReportById = jest.fn().mockResolvedValue({
        ...mockedReportData,
        pages: [],
      })

      await handler.get(req, res)

      expect(res.render).toHaveBeenCalledWith(
        `${handler.path}/${handler.templatePath}`,
        expect.objectContaining({
          data: expect.objectContaining({
            apiDefendantDetailsAvailable: false,
            sectionStatuses: expect.objectContaining({
              defendantDetails: expect.objectContaining({
                status: 'Incomplete',
                name: false,
                dateOfBirth: false,
                address: false,
              }),
            }),
          }),
        })
      )
    })
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/${req.params.reportId}/${handler.redirectPath}`)
    })

    it('should allow redirecting to another page even when the current page is incomplete', async () => {
      handler.model = {
        safeParse: jest.fn().mockReturnValue({
          success: false,
          error: {
            issues: [
              {
                path: ['someField'],
                message: 'Complete this field',
              },
            ],
          },
        }),
      } as never

      req.query = {
        redirectPath: 'risk-analysis',
      }

      await handler.post(req, res)

      expect(mockedReportService.updateReport).toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/${req.params.reportId}/risk-analysis`)
    })
  })
})
