import { Request, Response } from 'express'

import SharedController from './sharedController'
import ReportService from '../../services/reportService'
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
    updateReport: jest.fn().mockResolvedValue(undefined),
  } as unknown as ReportService
  let handler: SharedController
  let req: Request
  let res: Response

  beforeAll(() => {
    handler = new SharedController(mockedReportService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {
        reportId: 12345678,
      },
      body: {},
      session: {},
      path: '',
      query: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
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
      expect(validateUUIDMock).toHaveBeenCalled()
      const { reportId } = req.params
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        name: undefined,
        isEditing: false,
        pendingChanges: undefined,
        reportId,
        sourcesOfInformation: undefined,
        data: {
          ...mockedReportData,
          ...handler.data,
        },
      })
    })
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/${req.params.reportId}/${handler.redirectPath}`)
    })
  })
})
