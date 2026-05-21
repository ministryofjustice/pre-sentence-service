import { Request, Response } from 'express'

import SharedController from './sharedController'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import type { DefendantDetails as DefendantDetailsApiResponse } from '../../@types/preSentenceToDelius'
import { mockedReportData } from '../../services/__mocks__/reportService'
import validateUUID from '../../utils/reportValidation'

jest.mock('../../services/reportService')
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
    persistPartialFieldValues: jest.fn().mockResolvedValue({ persisted: [], dropped: [] }),
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

    describe('persist-on-invalid', () => {
      const setInvalidModel = (issues: Array<{ path: (string | number)[]; code: string; message: string }>) => {
        handler.model = {
          safeParse: jest.fn().mockReturnValue({
            success: false,
            error: { issues },
          }),
        } as never
      }

      const originalTemplatePath = handler?.templatePath
      beforeEach(() => {
        ;(mockedReportService.persistPartialFieldValues as jest.Mock).mockClear()
        ;(mockedReportService.persistPartialFieldValues as jest.Mock).mockResolvedValue({
          persisted: [],
          dropped: [],
        })
        handler.templatePath = 'offence-analysis'
      })
      afterAll(() => {
        handler.templatePath = originalTemplatePath ?? ''
      })

      it('persists valid fields when validation fails on a cross-field rule', async () => {
        setInvalidModel([{ path: ['offencesPattern'], code: 'custom', message: 'Cross-field rule' }])
        req.body = {
          offencesUnderConsideration: 'valid analysis',
          offencesPattern: '',
          noPreviousOffences: '',
        }

        await handler.post(req, res)

        expect(mockedReportService.persistPartialFieldValues).toHaveBeenCalledWith(
          '123',
          expect.objectContaining({ offencesUnderConsideration: 'valid analysis' }),
          'offence-analysis',
          []
        )
        expect(res.render).toHaveBeenCalled()
      })

      it('drops fields that have structural issues (too_big, invalid_type)', async () => {
        setInvalidModel([
          { path: ['offencesUnderConsideration'], code: 'too_big', message: 'Too long' },
          { path: ['offencesPattern'], code: 'custom', message: 'Cross-field' },
        ])
        req.body = {
          offencesUnderConsideration: 'a'.repeat(20_000),
          offencesPattern: 'short text',
        }

        await handler.post(req, res)

        const dropArg = (mockedReportService.persistPartialFieldValues as jest.Mock).mock.calls[0][3]
        expect(dropArg).toContain('offencesUnderConsideration')
        expect(dropArg).not.toContain('offencesPattern')
      })

      it('passes the controller-known pageName, not anything else', async () => {
        handler.templatePath = 'sentencing-proposal'
        setInvalidModel([{ path: ['proposedSentence'], code: 'too_small', message: 'Required' }])
        req.body = { proposedSentence: '', proposedSentenceRationale: 'rationale' }

        await handler.post(req, res)

        expect(mockedReportService.persistPartialFieldValues).toHaveBeenCalledWith(
          '123',
          expect.any(Object),
          'sentencing-proposal',
          expect.any(Array)
        )
      })
    })
  })
})
