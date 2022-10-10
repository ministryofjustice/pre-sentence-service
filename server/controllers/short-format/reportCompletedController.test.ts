import { Request, Response } from 'express'

import ReportCompletedController from './reportCompletedController'
import ReportService from '../../services/reportService'

jest.mock('../../services/reportService')

describe('Route Handlers - Report Completed Controller', () => {
  let mockedReportService: ReportService
  let handler: ReportCompletedController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    handler = new ReportCompletedController(mockedReportService)
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
