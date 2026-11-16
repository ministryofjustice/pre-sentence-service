import { Request, Response } from 'express'
import DeletedReportController from './deleted-report-controller'
import ReportService from '../../services/reportService'
import { ReportStatus } from '../../repositories/entities/reportDetails'

type ReportRequest = Request<{ reportId: string }>

const makeReq = (reportId = 'r1'): ReportRequest =>
  ({
    params: { reportId },
  }) as unknown as ReportRequest

const makeRes = (): Response =>
  ({
    render: jest.fn(),
    redirect: jest.fn(),
  }) as unknown as Response

describe('DeletedReportController', () => {
  let reportService: jest.Mocked<ReportService>

  beforeEach(() => {
    reportService = {
      getReportByIdIncludingDeleted: jest.fn(),
    } as unknown as jest.Mocked<ReportService>
  })

  it('renders psr/report-deleted for a soft-deleted report', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({
      id: 'r1',
      isDeleted: true,
      status: ReportStatus.COMPLETED,
    } as never)
    const res = makeRes()

    await new DeletedReportController(reportService).get(makeReq('r1'), res)

    expect(res.render).toHaveBeenCalledWith('psr/report-deleted', { reportId: 'r1' })
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it('redirects to /psr/:reportId when the report is not deleted', async () => {
    reportService.getReportByIdIncludingDeleted.mockResolvedValue({
      id: 'r1',
      isDeleted: false,
      status: ReportStatus.LOCKED,
    } as never)
    const res = makeRes()

    await new DeletedReportController(reportService).get(makeReq('r1'), res)

    expect(res.redirect).toHaveBeenCalledWith('/psr/r1')
    expect(res.render).not.toHaveBeenCalled()

    reportService.getReportByIdIncludingDeleted.mockResolvedValue(null)
    const res2 = makeRes()

    await new DeletedReportController(reportService).get(makeReq('r1'), res2)

    expect(res2.redirect).toHaveBeenCalledWith('/psr/r1')
    expect(res2.render).not.toHaveBeenCalled()
  })
})
