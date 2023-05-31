import { Request, Response } from 'express'

import OffenderDetailsController from './offenderDetailsController'
import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'

jest.mock('../../services/reportService')
jest.mock('../../services/communityService')

describe('Route Handlers - Offender Details Controller', () => {
  let mockedReportService: ReportService
  let mockedCommunityService: CommunityService
  let handler: OffenderDetailsController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    mockedCommunityService = new CommunityService(null)
    handler = new OffenderDetailsController(mockedReportService, mockedCommunityService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      session: {},
    } as Request
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
    } as unknown as Response
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        reportId: undefined,
        data: {
          name: undefined,
          age: NaN,
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
