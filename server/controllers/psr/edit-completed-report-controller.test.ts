import { Request, Response } from 'express'
import createError from 'http-errors'
import EditCompletedReportController from './edit-completed-report-controller'
import ReportService from '../../services/reportService'
import { ReportStatus } from '../../repositories/entities/reportDetails'
import config from '../../config'
import logger from '../../../logger'

jest.mock('../../../logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}))

type ReportRequest = Request<{ reportId: string }>

const makeReq = (reportId = 'r1'): ReportRequest =>
  ({
    params: { reportId },
  }) as unknown as ReportRequest

const makeRes = (username?: string): Response =>
  ({
    render: jest.fn(),
    redirect: jest.fn(),
    locals: username ? { user: { username } } : {},
  }) as unknown as Response

describe('EditCompletedReportController', () => {
  let reportService: jest.Mocked<ReportService>
  let originalFlag: boolean

  beforeEach(() => {
    reportService = {
      getReportByIdIncludingDeleted: jest.fn(),
      reopenReport: jest.fn(),
    } as unknown as jest.Mocked<ReportService>
    originalFlag = config.features.unlockedSigning
    config.features.unlockedSigning = true
  })

  afterEach(() => {
    config.features.unlockedSigning = originalFlag
  })

  describe('get', () => {
    it('renders psr/edit-completed with reportId, signedBy and signedAt for a COMPLETED report when the flag is on', async () => {
      const submittedAt = new Date('2026-10-28T14:02:00Z')
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: false,
        status: ReportStatus.COMPLETED,
        submittedAt,
        pages: [
          {
            name: 'sign-your-report',
            questions: [
              { id: 1, value: 'signReportName', answer: 'Jane Smith' },
              { id: 2, value: 'professionalStatus', answer: 'registered probation officer' },
            ],
          },
        ],
      } as never)
      const res = makeRes()

      await new EditCompletedReportController(reportService).get(makeReq('r1'), res)

      expect(res.render).toHaveBeenCalledWith('psr/edit-completed', {
        reportId: 'r1',
        signedBy: 'Jane Smith',
        signedAt: submittedAt,
      })
      expect(res.redirect).not.toHaveBeenCalled()
    })

    it('redirects to /psr/:reportId when the flag is off', async () => {
      config.features.unlockedSigning = false
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: false,
        status: ReportStatus.COMPLETED,
        submittedAt: new Date(),
        pages: [],
      } as never)
      const res = makeRes()

      await new EditCompletedReportController(reportService).get(makeReq('r1'), res)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
      expect(res.render).not.toHaveBeenCalled()
    })

    it('redirects to /psr/:reportId for an in-progress (STARTED) report', async () => {
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: false,
        status: ReportStatus.STARTED,
        submittedAt: null,
        pages: [],
      } as never)
      const res = makeRes()

      await new EditCompletedReportController(reportService).get(makeReq('r1'), res)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
      expect(res.render).not.toHaveBeenCalled()
    })

    it('redirects to /psr/:reportId for a LOCKED report', async () => {
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: false,
        status: ReportStatus.LOCKED,
        submittedAt: new Date(),
        pages: [],
      } as never)
      const res = makeRes()

      await new EditCompletedReportController(reportService).get(makeReq('r1'), res)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
      expect(res.render).not.toHaveBeenCalled()
    })

    it('redirects to /psr/:reportId for a deleted report', async () => {
      reportService.getReportByIdIncludingDeleted.mockResolvedValue({
        id: 'r1',
        isDeleted: true,
        status: ReportStatus.COMPLETED,
        submittedAt: new Date(),
        pages: [],
      } as never)
      const res = makeRes()

      await new EditCompletedReportController(reportService).get(makeReq('r1'), res)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
      expect(res.render).not.toHaveBeenCalled()
    })

    it('redirects to /psr/:reportId for an unknown report', async () => {
      reportService.getReportByIdIncludingDeleted.mockResolvedValue(null)
      const res = makeRes()

      await new EditCompletedReportController(reportService).get(makeReq('r1'), res)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
      expect(res.render).not.toHaveBeenCalled()
    })
  })

  describe('post', () => {
    it('redirects to /psr/:reportId without calling reopenReport when the flag is off', async () => {
      config.features.unlockedSigning = false
      const res = makeRes('jane.doe')

      await new EditCompletedReportController(reportService).post(makeReq('r1'), res)

      expect(reportService.reopenReport).not.toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
    })

    it('calls reopenReport with the session username and redirects to /psr/:reportId/defendant-details', async () => {
      reportService.reopenReport.mockResolvedValue(undefined)
      const res = makeRes('jane.doe')

      await new EditCompletedReportController(reportService).post(makeReq('r1'), res)

      expect(reportService.reopenReport).toHaveBeenCalledWith('r1', 'jane.doe')
      expect(res.redirect).toHaveBeenCalledWith('/psr/r1/defendant-details')
    })

    it('calls reopenReport with "system" when no session username is present', async () => {
      reportService.reopenReport.mockResolvedValue(undefined)
      const res = makeRes()

      await new EditCompletedReportController(reportService).post(makeReq('r1'), res)

      expect(reportService.reopenReport).toHaveBeenCalledWith('r1', 'system')
      expect(res.redirect).toHaveBeenCalledWith('/psr/r1/defendant-details')
    })

    it('redirects to /psr/:reportId without crashing when reopenReport throws 409', async () => {
      reportService.reopenReport.mockRejectedValue(createError(409, 'Report r1 is not in a COMPLETED state'))
      const res = makeRes('jane.doe')

      await new EditCompletedReportController(reportService).post(makeReq('r1'), res)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
    })

    it('logs a warning with the reportId and error when reopenReport fails', async () => {
      const error = createError(409, 'Report r1 is not in a COMPLETED state')
      reportService.reopenReport.mockRejectedValue(error)
      const res = makeRes('jane.doe')

      await new EditCompletedReportController(reportService).post(makeReq('r1'), res)

      expect(logger.warn).toHaveBeenCalledWith({ reportId: 'r1', error }, expect.any(String))
    })

    it('redirects to /psr/:reportId without crashing when reopenReport throws 404', async () => {
      reportService.reopenReport.mockRejectedValue(createError(404, 'Report r1 not found'))
      const res = makeRes('jane.doe')

      await new EditCompletedReportController(reportService).post(makeReq('r1'), res)

      expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
    })
  })
})
