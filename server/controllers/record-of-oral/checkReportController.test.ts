import { Request, Response } from 'express'

import CheckReportController from './checkReportController'
import ReportService from '../../services/reportService'

jest.mock('../../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getReportById: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
    }
  })
})

describe('Route Handlers - Check Report Controller', () => {
  let mockedReportService: ReportService
  let handler: CheckReportController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    handler = new CheckReportController(mockedReportService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {},
    } as Request
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
          ...handler.data,
          ...handler.defaultTemplateData,
        },
      })
    })
  })
})
