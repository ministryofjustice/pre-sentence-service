import ReportService from './reportService'
import ReportDetailsService from './reportDetailsService'
import EventService from './eventService'
import { htmlToPlainText } from '../utils/htmlToPlainText'
import { EntityManager, getConnection } from 'typeorm'

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  getConnection: jest.fn(),
}))
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

describe('ReportService.updateFieldValues — write chokepoint', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
  })

  it('stores HTML payloads as plain text in the answer field', async () => {
    const captured: { pages?: unknown } = {}
    reportDetailsService.getReportDetailsById = jest.fn().mockResolvedValue({ id: 'r1', pages: [] })
    reportDetailsService.updateReportPages = jest.fn().mockImplementation(async (_id: string, pages: unknown) => {
      captured.pages = pages
      return { id: 'r1', pages }
    })

    await reportService.updateFieldValues('r1', [
      {
        pageName: 'sentencing-proposal',
        questionId: 1,
        questionValue: 'proposedSentence',
        answer: '<p>line one</p><p>line two</p>',
      },
    ])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pages = captured.pages as any[]
    expect(pages[0].questions[0].answer).toBe(htmlToPlainText('<p>line one</p><p>line two</p>'))
    expect(pages[0].questions[0].answer).not.toMatch(/</)
  })

  it('leaves plain text values unchanged', async () => {
    const captured: { pages?: unknown } = {}
    reportDetailsService.getReportDetailsById = jest.fn().mockResolvedValue({ id: 'r1', pages: [] })
    reportDetailsService.updateReportPages = jest.fn().mockImplementation(async (_id: string, pages: unknown) => {
      captured.pages = pages
      return { id: 'r1', pages }
    })

    await reportService.updateFieldValues('r1', [
      {
        pageName: 'sentencing-proposal',
        questionId: 1,
        questionValue: 'proposedSentence',
        answer: 'already plain text',
      },
    ])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pages = captured.pages as any[]
    expect(pages[0].questions[0].answer).toBe('already plain text')
  })
})

// Checks that saving sources of information uses one transaction manager
// This does not prove rollback in PostgreSQL
describe('ReportService.saveSourcesOfInformation', () => {
  const manager = {} as EntityManager

  let reportService: ReportService
  let getReport: jest.Mock
  let addSource: jest.Mock
  let removeSource: jest.Mock
  let getSources: jest.Mock
  let updateFields: jest.Mock

  const savedAnswer = () => updateFields.mock.calls[0][1][0].answer

  beforeEach(() => {
    ;(getConnection as jest.Mock).mockReturnValue({
      transaction: async (runInTransaction: (entityManager: EntityManager) => Promise<unknown>) => {
        return runInTransaction(manager)
      },
    })

    reportService = new ReportService()

    getReport = jest.fn().mockResolvedValue({ id: 'r1', status: 'STARTED', pages: [] })
    addSource = jest.fn().mockResolvedValue(undefined)
    removeSource = jest.fn().mockResolvedValue(undefined)
    getSources = jest.fn().mockResolvedValue([])
    updateFields = jest.fn().mockResolvedValue({ id: 'r1' })

    const reportDetailsService = (reportService as unknown as { reportDetailsService: ReportDetailsService })
      .reportDetailsService

    // All mocks share the transaction manager passed through by saveSourcesOfInformation
    reportDetailsService.getReportDetailsById = getReport
    reportService.addCustomSourceOfInformation = addSource
    reportService.removeCustomSourceOfInformation = removeSource
    reportService.getSourcesOfInformation = getSources
    reportService.updateFieldValues = updateFields
  })

  it('uses one transaction manager for adding a source and saving the report answer', async () => {
    getSources.mockResolvedValue([
      { key: 'cps_summary', value: 'CPS summary', isCustom: false },
      { key: 'a_custom_source', value: 'A custom source', isCustom: true },
    ])

    await reportService.saveSourcesOfInformation({
      reportId: 'r1',
      selectedSourceKeys: ['cps_summary'],
      sourceToAdd: 'A custom source',
      username: 'testuser',
    })

    expect(getReport).toHaveBeenCalledWith('r1', manager)
    expect(getSources).toHaveBeenCalledWith('r1', manager)
    expect(addSource).toHaveBeenCalledWith('r1', 'A custom source', 'testuser', manager)
    expect(updateFields).toHaveBeenCalledWith(
      'r1',
      [
        {
          pageName: 'sources-of-information',
          questionId: 0,
          questionValue: 'sourcesOfInformation',
          answer: 'cps_summary,a_custom_source',
        },
      ],
      manager
    )
  })

  it('drops a removed custom source while keeping posted selections', async () => {
    // Reflects the post-removal state, since the re-read happens after the delete
    getSources.mockResolvedValue([{ key: 'cps_summary', value: 'CPS summary', isCustom: false }])

    await reportService.saveSourcesOfInformation({
      reportId: 'r1',
      selectedSourceKeys: ['cps_summary'],
      sourceToRemove: 'a_custom_source',
      username: 'testuser',
    })

    expect(removeSource).toHaveBeenCalledWith('r1', 'a_custom_source', manager)
    expect(savedAnswer()).toBe('cps_summary')
  })
})