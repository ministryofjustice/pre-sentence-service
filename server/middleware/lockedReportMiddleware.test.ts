import { Request, Response, NextFunction } from 'express'
import lockedReportMiddleware from './lockedReportMiddleware'
import ReportService from '../services/reportService'
import { ReportStatus } from '../repositories/entities/reportDetails'
import config from '../config'

type ReportRequest = Request<{ reportId: string }>

const makeReq = (path: string, reportId = 'r1'): ReportRequest =>
  ({
    path,
    params: { reportId },
  }) as unknown as ReportRequest

const makeRes = (): Response =>
  ({
    locals: {},
    redirect: jest.fn(),
  }) as unknown as Response

describe('lockedReportMiddleware', () => {
  let reportService: jest.Mocked<ReportService>
  let next: jest.MockedFunction<NextFunction>

  beforeEach(() => {
    reportService = {
      getReportByIdIncludingDeleted: jest.fn(),
    } as unknown as jest.Mocked<ReportService>
    next = jest.fn()
  })

  it('calls next when the report is not locked (submittedAt is null)', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({ id: 'r1', submittedAt: null } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it('redirects to publish-report when the report is locked and the route is not allow-listed', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({ id: 'r1', submittedAt: new Date() } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/publish-report')
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next for allow-listed routes (publish-report, pdf)', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({ id: 'r1', submittedAt: null } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/publish-report'), res, next)
    await new Promise(setImmediate)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.redirect).not.toHaveBeenCalled()

    next.mockClear()
    const res2 = makeRes()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/pdf'), res2, next)
    await new Promise(setImmediate)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res2.redirect).not.toHaveBeenCalled()
  })

  it('redirects a soft-deleted report to /psr/r1/deleted', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({ id: 'r1', isDeleted: true } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/deleted')
    expect(next).not.toHaveBeenCalled()
  })

  it('redirects a LOCKED report to /psr/r1/locked', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({
      id: 'r1',
      isDeleted: false,
      status: ReportStatus.LOCKED,
    } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/locked')
    expect(next).not.toHaveBeenCalled()
  })

  it('redirects a LOCKED report to /psr/r1/locked even for publish-report and pdf paths', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({
      id: 'r1',
      isDeleted: false,
      status: ReportStatus.LOCKED,
    } as never)

    const res = makeRes()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/publish-report'), res, next)
    await new Promise(setImmediate)
    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/locked')
    expect(next).not.toHaveBeenCalled()

    const res2 = makeRes()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/pdf'), res2, next)
    await new Promise(setImmediate)
    expect(res2.redirect).toHaveBeenCalledWith('/psr/r1/locked')
    expect(next).not.toHaveBeenCalled()
  })

  it('redirects a deleted report to /psr/r1/deleted even for publish-report and pdf paths', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({ id: 'r1', isDeleted: true } as never)

    const res = makeRes()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/publish-report'), res, next)
    await new Promise(setImmediate)
    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/deleted')
    expect(next).not.toHaveBeenCalled()

    const res2 = makeRes()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/pdf'), res2, next)
    await new Promise(setImmediate)
    expect(res2.redirect).toHaveBeenCalledWith('/psr/r1/deleted')
    expect(next).not.toHaveBeenCalled()
  })

  it('redirects to /psr/r1/deleted when a report is both deleted and LOCKED', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({
      id: 'r1',
      isDeleted: true,
      status: ReportStatus.LOCKED,
    } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/deleted')
    expect(res.redirect).not.toHaveBeenCalledWith('/psr/r1/locked')
    expect(next).not.toHaveBeenCalled()
  })

  it('still allows publish-report and pdf for a submitted (COMPLETED) report', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({
      id: 'r1',
      isDeleted: false,
      status: ReportStatus.COMPLETED,
      submittedAt: new Date(),
    } as never)

    const res = makeRes()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/publish-report'), res, next)
    await new Promise(setImmediate)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.redirect).not.toHaveBeenCalled()

    next.mockClear()
    const res2 = makeRes()
    lockedReportMiddleware(reportService)(makeReq('/psr/r1/pdf'), res2, next)
    await new Promise(setImmediate)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res2.redirect).not.toHaveBeenCalled()
  })

  it('calls next with res.locals.report unset for an unknown report', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue(null)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.redirect).not.toHaveBeenCalled()
    expect(res.locals.report).toBeUndefined()
  })

  describe('with unlockedSigning flag on', () => {
    let originalFlag: boolean

    beforeEach(() => {
      originalFlag = config.features.unlockedSigning
      config.features.unlockedSigning = true
    })

    afterEach(() => {
      config.features.unlockedSigning = originalFlag
    })

    it('redirects a submitted report to /psr/r1/edit-completed when the flag is on', async () => {
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: false,
        status: ReportStatus.COMPLETED,
        submittedAt: new Date(),
      } as never)
      const res = makeRes()

      lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
      await new Promise(setImmediate)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1/edit-completed')
      expect(next).not.toHaveBeenCalled()
    })

    it('still allows publish-report and pdf paths for a submitted report when the flag is on', async () => {
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: false,
        status: ReportStatus.COMPLETED,
        submittedAt: new Date(),
      } as never)

      const res = makeRes()
      lockedReportMiddleware(reportService)(makeReq('/psr/r1/publish-report'), res, next)
      await new Promise(setImmediate)
      expect(next).toHaveBeenCalledTimes(1)
      expect(res.redirect).not.toHaveBeenCalled()

      next.mockClear()
      const res2 = makeRes()
      lockedReportMiddleware(reportService)(makeReq('/psr/r1/pdf'), res2, next)
      await new Promise(setImmediate)
      expect(next).toHaveBeenCalledTimes(1)
      expect(res2.redirect).not.toHaveBeenCalled()
    })

    it('leaves in-progress (STARTED, unsubmitted) reports untouched when the flag is on', async () => {
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: false,
        status: ReportStatus.STARTED,
        submittedAt: null,
      } as never)
      const res = makeRes()

      lockedReportMiddleware(reportService)(makeReq('/psr/r1/defendant-details'), res, next)
      await new Promise(setImmediate)

      expect(next).toHaveBeenCalledTimes(1)
      expect(res.redirect).not.toHaveBeenCalled()
    })
  })

  it('still redirects to /psr/r1/publish-report when the flag is off', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({
      id: 'r1',
      isDeleted: false,
      status: ReportStatus.COMPLETED,
      submittedAt: new Date(),
    } as never)
    const res = makeRes()

    lockedReportMiddleware(reportService)(makeReq('/psr/r1/offence-analysis'), res, next)
    await new Promise(setImmediate)

    expect(res.redirect).toHaveBeenCalledWith('/psr/r1/publish-report')
    expect(next).not.toHaveBeenCalled()
  })
})
