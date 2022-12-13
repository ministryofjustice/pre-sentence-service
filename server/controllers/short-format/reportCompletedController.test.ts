import { Request, Response } from 'express'

import ReportCompletedController from './reportCompletedController'
import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'

jest.mock('../../services/reportService')
jest.mock('../../services/communityService')

describe('Route Handlers - Report Completed Controller', () => {
  let mockedReportService: ReportService
  let mockedCommunityService: CommunityService
  let handler: ReportCompletedController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    mockedCommunityService = new CommunityService(null)
    handler = new ReportCompletedController(mockedReportService, mockedCommunityService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {
        reportType: 'short-format',
      },
      session: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
    } as unknown as Response
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        data: {
          ...handler.defaultTemplateData,
        },
      })
    })
  })
})
