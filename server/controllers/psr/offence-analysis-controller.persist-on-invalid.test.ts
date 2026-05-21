import { Request, Response } from 'express'
import OffenceAnalysisController from './offence-analysis-controller'
import ReportService from '../../services/reportService'
import { mockedReportData } from '../../services/__mocks__/reportService'

jest.mock('../../services/reportService')

describe('OffenceAnalysisController — persist-on-invalid (bug fix)', () => {
  let controller: OffenceAnalysisController
  let reportService: ReportService
  let req: Request
  let res: Response

  beforeEach(() => {
    reportService = {
      getReportById: jest.fn().mockResolvedValue({ ...mockedReportData, status: 'STARTED' }),
      updateReport: jest.fn().mockResolvedValue(mockedReportData),
      updateFieldValues: jest.fn().mockResolvedValue(mockedReportData),
      persistPartialFieldValues: jest
        .fn()
        .mockImplementation(async (_id: string, body: Record<string, unknown>, _pageName: string) => ({
          persisted: Object.keys(body),
          dropped: [],
        })),
    } as unknown as ReportService

    controller = new OffenceAnalysisController(reportService)

    req = {
      params: { reportId: '123' },
      path: '/psr/123/offence-analysis',
      session: {},
      body: {},
      query: {},
    } as unknown as Request

    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: { user: { username: 'testuser' } },
    } as unknown as Response
  })

  it('persists offencesUnderConsideration when the user leaves offencesPattern empty (the original bug)', async () => {
    req.body = {
      offencesUnderConsideration: 'My analysis of the offences',
      offencesPattern: '',
    }

    await controller.post(req, res)

    expect(reportService.persistPartialFieldValues).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({ offencesUnderConsideration: 'My analysis of the offences' }),
      'offence-analysis',
      []
    )
    expect(res.redirect).not.toHaveBeenCalled()
    expect(res.render).toHaveBeenCalled()
  })

  it('does not persist when validation passes (the existing happy path still works)', async () => {
    req.body = {
      offencesUnderConsideration: 'Analysis',
      offencesPattern: 'Pattern of offending',
      noPreviousOffences: 'false',
    }

    await controller.post(req, res)

    expect(reportService.persistPartialFieldValues).not.toHaveBeenCalled()
    expect(reportService.updateFieldValues).toHaveBeenCalled()
    expect(res.redirect).toHaveBeenCalledWith('/psr/123/defendant-behaviour')
  })
})
