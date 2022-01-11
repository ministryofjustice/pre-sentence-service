import BaseController from './baseController'

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

describe('Route Handlers - Base Controller', () => {
  let handler: BaseController

  beforeAll(() => {
    const mockedReportService = new ReportService()
    handler = new BaseController(mockedReportService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  describe('values', () => {
    it('should declare path as string', async () => {
      expect(handler.path).toBe('short-format')
    })

    it('should declare default templateValues', async () => {
      expect(handler.templateValues.reportPath).toBe('short-format')
      expect(handler.templateValues.preSentenceType).toBe('Short Format Pre-Sentence Report')
    })
  })
})
