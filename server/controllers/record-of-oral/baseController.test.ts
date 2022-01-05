import BaseController from './baseController'
import ReportService from '../../services/reportService'

jest.mock('../../services/reportService')

describe('Route Handlers - Base Controller', () => {
  let handler: BaseController

  beforeAll(() => {
    const mockedReportService = new ReportService()
    handler = new BaseController(mockedReportService)
  })

  describe('values', () => {
    it('should declare path as string', async () => {
      expect(handler.path).toBe('record-of-oral')
    })

    it('should declare default templateValues', async () => {
      expect(handler.templateValues.reportPath).toBe('record-of-oral')
      expect(handler.templateValues.preSentenceType).toBe('Record of Oral Pre-Sentence Report')
    })
  })
})
