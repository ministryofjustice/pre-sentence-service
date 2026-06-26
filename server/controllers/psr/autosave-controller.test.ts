import { Request, Response } from 'express'
import AutosaveController from './autosave-controller'
import ReportService from '../../services/reportService'
import ReportDetails, { ReportStatus } from '../../repositories/entities/reportDetails'

jest.mock('../../services/reportService')

const mockReportDetails: ReportDetails = {
  id: '123',
  personId: 1,
  status: ReportStatus.NOT_STARTED,
  origin: '1',
  reportType: 'short-format',
  pages: [],
  createdAt: new Date('2024-01-01'),
  createdBy: 'testuser',
  lastUpdatedBy: new Date('2024-01-01'),
  isDeleted: false,
  version: 1,
  person: {
    id: 1,
    crn: 'X12345B',
    createdAt: new Date('2024-01-01'),
    createdBy: 'testuser',
    lastUpdatedBy: new Date('2024-01-01'),
    isDeleted: false,
    version: 1,
  },
}

describe('AutosaveController', () => {
  let controller: AutosaveController
  let reportService: ReportService
  let req: Request
  let res: Response
  let statusJson: jest.Mock
  let status: jest.Mock
  let getReportByIdSpy: jest.SpiedFunction<ReportService['getReportById']>
  let updateReportSpy: jest.SpiedFunction<ReportService['updateReport']>
  let persistPartialFieldValuesSpy: jest.SpiedFunction<ReportService['persistPartialFieldValues']>

  beforeEach(() => {
    jest.clearAllMocks()
    reportService = new ReportService()

    getReportByIdSpy = jest.spyOn(reportService, 'getReportById').mockResolvedValue(mockReportDetails)
    updateReportSpy = jest.spyOn(reportService, 'updateReport').mockResolvedValue(mockReportDetails)
    persistPartialFieldValuesSpy = jest
      .spyOn(reportService, 'persistPartialFieldValues')
      .mockResolvedValue({ persisted: [], dropped: [] })

    controller = new AutosaveController(reportService)

    statusJson = jest.fn()
    status = jest.fn().mockReturnValue({ json: statusJson })

    req = {
      body: {},
      params: { reportId: '123' },
      query: {},
      headers: {},
    } as unknown as Request

    res = {
      status,
    } as unknown as Response
  })

  it('drops over-limit fields and persists the rest, returning droppedFields in the response', async () => {
    persistPartialFieldValuesSpy.mockResolvedValueOnce({
      persisted: ['otherField'],
      dropped: ['defendantBehaviour'],
    })

    req.body = {
      defendantBehaviour: 'a'.repeat(10001),
      otherField: 'ok',
      pageName: 'psr-defendant-behaviour',
    }

    await controller.post(req, res)

    expect(updateReportSpy).toHaveBeenCalledWith('123', { status: ReportStatus.STARTED })
    expect(persistPartialFieldValuesSpy).toHaveBeenCalledWith('123', req.body, 'psr-defendant-behaviour')
    expect(status).toHaveBeenCalledWith(200)
    expect(statusJson).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, droppedFields: ['defendantBehaviour'] })
    )
  })

  it('uses form-supplied pageName over referer scraping', async () => {
    req.body = { someField: 'value', pageName: 'offence-analysis' }
    req.headers = { referer: 'http://x/psr/123/risk-analysis' } as Request['headers']

    await controller.post(req, res)

    expect(persistPartialFieldValuesSpy).toHaveBeenCalledWith('123', req.body, 'offence-analysis')
  })

  it('returns 404 when report is missing', async () => {
    getReportByIdSpy.mockResolvedValueOnce(null)
    req.body = { someField: 'value' }

    await controller.post(req, res)

    expect(status).toHaveBeenCalledWith(404)
    expect(statusJson).toHaveBeenCalledWith({ error: 'Report not found' })
    expect(updateReportSpy).not.toHaveBeenCalled()
    expect(persistPartialFieldValuesSpy).not.toHaveBeenCalled()
  })

  it('uses default pageName when none is provided', async () => {
    req.body = { someField: 'value' }
    req.query = {}
    req.headers = {}

    await controller.post(req, res)

    expect(persistPartialFieldValuesSpy).toHaveBeenCalledWith('123', req.body, 'default')
    expect(status).toHaveBeenCalledWith(200)
    expect(statusJson).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Report saved successfully',
      })
    )
  })

  it('falls back to 500 and default error message on unexpected errors', async () => {
    persistPartialFieldValuesSpy.mockRejectedValueOnce({})
    req.body = { someField: 'someValue' }

    await controller.post(req, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(statusJson).toHaveBeenCalledWith({ error: 'Failed to save report' })
  })

  it('uses query pageName when body pageName is not provided', async () => {
    req.body = { someField: 'value' }
    req.query = { pageName: 'risk-analysis' }

    await controller.post(req, res)

    expect(persistPartialFieldValuesSpy).toHaveBeenCalledWith('123', req.body, 'risk-analysis')
  })

  it('maps referer defendant-details to psr-defendant-details', async () => {
    req.body = { someField: 'value' }
    req.headers = { referer: 'http://x/psr/123/defendant-details' } as Request['headers']

    await controller.post(req, res)

    expect(persistPartialFieldValuesSpy).toHaveBeenCalledWith('123', req.body, 'psr-defendant-details')
  })

  it('maps referer defendant-behaviour to psr-defendant-behaviour', async () => {
    req.body = { someField: 'value' }
    req.headers = { referer: 'http://x/psr/123/defendant-behaviour' } as Request['headers']

    await controller.post(req, res)

    expect(persistPartialFieldValuesSpy).toHaveBeenCalledWith('123', req.body, 'psr-defendant-behaviour')
  })

  it('calls updateReport with empty object when report is already STARTED', async () => {
    getReportByIdSpy.mockResolvedValueOnce({
      ...mockReportDetails,
      status: ReportStatus.STARTED,
    })

    req.body = { someField: 'value', pageName: 'offence-analysis' }

    await controller.post(req, res)

    expect(updateReportSpy).toHaveBeenCalledWith('123', {})
    expect(persistPartialFieldValuesSpy).toHaveBeenCalledWith('123', req.body, 'offence-analysis')
    expect(status).toHaveBeenCalledWith(200)
  })
})
