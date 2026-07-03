import ReportService from './reportService'
import ReportDetailsService from './reportDetailsService'
import EventService from './eventService'

jest.mock('./reportDetailsService')
jest.mock('./personDetailsService')
jest.mock('./sourcesOfInformationService')

describe('ReportService.submitReport', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let eventService: jest.Mocked<EventService>

  const mockStamped = { id: 'r1', submittedAt: new Date() } as never

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(mockStamped)

    eventService = {
      sendReportEvent: jest.fn(),
    } as unknown as jest.Mocked<EventService>
  })

  it('stamps submittedAt, publishes event, returns the stamped report', async () => {
    eventService.sendReportEvent.mockResolvedValue({} as never)

    const result = await reportService.submitReport('r1', eventService, {
      eventNumber: 'r1',
      crn: 'X1',
      reportStatus: 'created',
      username: 'u',
    })

    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith(
      'r1',
      expect.objectContaining({ submittedAt: expect.any(Date) })
    )
    expect(eventService.sendReportEvent).toHaveBeenCalledTimes(1)
    expect(result).toBe(mockStamped)
  })

  it('retries publish up to 3 times before giving up', async () => {
    jest.useFakeTimers()
    eventService.sendReportEvent.mockRejectedValue(new Error('SNS down'))

    const promise = reportService
      .submitReport('r1', eventService, {
        eventNumber: 'r1',
        crn: 'X1',
        reportStatus: 'created',
        username: 'u',
      })
      .catch(e => e)

    await jest.runAllTimersAsync()
    const result = await promise

    expect(result).toBeInstanceOf(Error)
    expect((result as Error).message).toBe('SNS down')
    expect(eventService.sendReportEvent).toHaveBeenCalledTimes(3)
    jest.useRealTimers()
  })

  it('rolls back submittedAt to null when publish fails on every retry', async () => {
    jest.useFakeTimers()
    eventService.sendReportEvent.mockRejectedValue(new Error('SNS down'))

    const promise = reportService
      .submitReport('r1', eventService, {
        eventNumber: 'r1',
        crn: 'X1',
        reportStatus: 'created',
        username: 'u',
      })
      .catch(e => e)

    await jest.runAllTimersAsync()
    await promise

    expect(reportDetailsService.updateReportDetails).toHaveBeenNthCalledWith(
      1,
      'r1',
      expect.objectContaining({ submittedAt: expect.any(Date) })
    )
    expect(reportDetailsService.updateReportDetails).toHaveBeenLastCalledWith('r1', { submittedAt: null })
    jest.useRealTimers()
  })

  it('throws without publishing if the initial stamp returns null (report not found)', async () => {
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(null)

    await expect(
      reportService.submitReport('missing', eventService, {
        eventNumber: 'missing',
        crn: 'X1',
        reportStatus: 'created',
        username: 'u',
      })
    ).rejects.toThrow(/not found/)

    expect(eventService.sendReportEvent).not.toHaveBeenCalled()
  })
})
