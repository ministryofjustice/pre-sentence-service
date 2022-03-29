import { Request, Response } from 'express'

import ReportCompletedController from './reportCompletedController'
import ReportService from '../../services/reportService'
import EventService from '../../services/eventService'

jest.mock('../../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getReportById: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
      updateReport: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
    }
  })
})

jest.mock('../../services/eventService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      sendReportEvent: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
    }
  })
})

describe('Route Handlers - Report Completed Controller', () => {
  let mockedEventService: EventService
  let mockedReportService: ReportService
  let handler: ReportCompletedController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    mockedEventService = new EventService()
    handler = new ReportCompletedController(mockedReportService, mockedEventService)
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
          ...handler.defaultTemplateData,
        },
      })
    })
  })
})
