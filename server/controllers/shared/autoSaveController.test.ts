import { Request, Response } from 'express'

import ReportService from '../../services/reportService'
import AutoSaveController from './autoSaveController'

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

describe('Route Handlers - Auto Save Controller', () => {
  let mockedReportService: ReportService
  let handler: AutoSaveController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    handler = new AutoSaveController(mockedReportService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {
        reportId: '12345678',
      },
      body: [
        {
          id: 'name',
          value: 'Some name',
        },
      ],
      session: {},
    } as unknown as Request
    res = {
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalled()
    })
  })
})
