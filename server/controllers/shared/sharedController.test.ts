import { Request, Response } from 'express'

import SharedController, {isValidReportId} from './sharedController'
import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'
import { mockedReportData } from '../../services/__mocks__/reportService'
import {v4 as uuid4} from 'uuid';

jest.mock('../../services/reportService')
jest.mock('../../services/communityService')

describe('Route Handlers - Shared Controller', () => {
  const validateUUIDMock = isValidReportId as jest.MockedFunction<(uuid: string) => true>
  let mockedReportService: ReportService
  let mockedCommunityService: CommunityService
  let handler: SharedController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    mockedCommunityService = new CommunityService(null)
    handler = new SharedController(mockedReportService, mockedCommunityService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {
        reportId: uuid4(),
      },
      body: {},
      session: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
    } as unknown as Response
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

    it('should declare empty form validation object', async () => {
      expect(typeof handler.formValidation).toBe('object')
      expect(handler.formValidation.required.length).toBe(0)
    })
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(validateUUIDMock).toHaveBeenCalled()
      let reportId = req.params.reportId;
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        reportId,
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
