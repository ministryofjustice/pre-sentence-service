import { Request, Response, NextFunction } from 'express'
import lockedReportMiddleware from './lockedReportMiddleware'
import ReportService from '../services/reportService'

const makeReq = (path: string, reportId = 'r1'): Request =>
  ({
    path,
    params: { reportId },
  }) as unknown as Request

const makeRes = (): Response =>
  ({
    redirect: jest.fn(),
  }) as unknown as Response

describe('lockedReportMiddleware', () => {
  let reportService: jest.Mocked<ReportService>
  let next: jest.MockedFunction<NextFunction>

  beforeEach(() => {
    reportService = {
      getReportById: jest.fn(),
    } as unknown as jest.Mocked<ReportService>
    next = jest.fn()
  })

  it('calls next when the report is not locked (submittedAt is null)', async () => {
    reportService.getReportById.mockResolvedValue({ id: 'r1', submittedAt: null } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it('redirects to publish-report when the report is locked and the route is not allow-listed', async () => {
    reportService.getReportById.mockResolvedValue({ id: 'r1', submittedAt: new Date() } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/publish-report')
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next for allow-listed routes (publish-report, pdf) without consulting the report', () => {
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/publish-report'), res, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(reportService.getReportById).not.toHaveBeenCalled()

    next.mockClear()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/pdf'), res, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(reportService.getReportById).not.toHaveBeenCalled()
  })
})
