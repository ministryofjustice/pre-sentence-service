import ReportService from './reportService'
import ReportDetailsService from './reportDetailsService'
import EventService from './eventService'
import ReportStatusHistoryService, { DELETED_STATUS } from './reportStatusHistoryService'
import { ReportStatus } from '../repositories/entities/reportDetails'
import { htmlToPlainText } from '../utils/htmlToPlainText'
import { EntityManager } from 'typeorm'
import config from '../config'
import { dataSource } from '../repositories/db'

jest.mock('../repositories/db', () => ({
  dataSource: {
    transaction: jest.fn(),
  },
}))
jest.mock('./reportDetailsService')
jest.mock('./personDetailsService')
jest.mock('./sourcesOfInformationService')
jest.mock('./reportStatusHistoryService')

describe('ReportService.submitReport', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>
  let eventService: jest.Mocked<EventService>

  const mockStamped = { id: 'r1', submittedAt: new Date() } as never

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
    reportDetailsService.getReportDetailsById = jest.fn().mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED })
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(mockStamped)
    reportStatusHistoryService.recordStatusChange = jest.fn().mockResolvedValue({ id: 'h1' })

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
      expect.objectContaining({ submittedAt: expect.any(Date), status: ReportStatus.COMPLETED })
    )
    expect(eventService.sendReportEvent).toHaveBeenCalledTimes(1)
    expect(result).toBe(mockStamped)
  })

  it('stamps submittedAt and sets status COMPLETED, recording previous -> COMPLETED history with eventData.username', async () => {
    eventService.sendReportEvent.mockResolvedValue({} as never)

    await reportService.submitReport('r1', eventService, {
      eventNumber: 'r1',
      crn: 'X1',
      reportStatus: 'created',
      username: 'u',
    })

    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith(
      'r1',
      expect.objectContaining({ submittedAt: expect.any(Date), status: ReportStatus.COMPLETED })
    )
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.STARTED,
      newStatus: ReportStatus.COMPLETED,
      changedBy: 'u',
    })
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
      expect.objectContaining({ submittedAt: expect.any(Date), status: ReportStatus.COMPLETED })
    )
    expect(reportDetailsService.updateReportDetails).toHaveBeenLastCalledWith('r1', {
      submittedAt: null,
      status: ReportStatus.STARTED,
    })
    jest.useRealTimers()
  })

  it('on publish failure, restores previous status and submittedAt null, and removes the history row', async () => {
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

    expect(reportDetailsService.updateReportDetails).toHaveBeenLastCalledWith('r1', {
      submittedAt: null,
      status: ReportStatus.STARTED,
    })
    expect(reportStatusHistoryService.removeStatusChange).toHaveBeenCalledWith('h1')
    jest.useRealTimers()
  })

  it('rolls back the stamp without removing history when recording the history row fails', async () => {
    reportStatusHistoryService.recordStatusChange = jest.fn().mockRejectedValue(new Error('DB down'))

    await expect(
      reportService.submitReport('r1', eventService, {
        eventNumber: 'r1',
        crn: 'X1',
        reportStatus: 'created',
        username: 'u',
      })
    ).rejects.toThrow('DB down')

    expect(reportDetailsService.updateReportDetails).toHaveBeenLastCalledWith('r1', {
      submittedAt: null,
      status: ReportStatus.STARTED,
    })
    expect(reportStatusHistoryService.removeStatusChange).not.toHaveBeenCalled()
    expect(eventService.sendReportEvent).not.toHaveBeenCalled()
  })

  it('throws without publishing if the initial stamp returns null (report not found)', async () => {
    reportDetailsService.getReportDetailsById = jest.fn().mockResolvedValue(null)

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
    ;(dataSource.transaction as jest.Mock).mockImplementation(
      async (runInTransaction: (entityManager: EntityManager) => Promise<unknown>) => {
        return runInTransaction(manager)
      }
    )

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

describe('status history wiring', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  it('createReport records null -> NOT_STARTED with the creating username', async () => {
    const personDetailsService = (
      reportService as unknown as { personDetailsService: { getPersonDetailsByCrn: jest.Mock } }
    ).personDetailsService
    personDetailsService.getPersonDetailsByCrn = jest.fn().mockResolvedValue({ id: 1 })
    reportDetailsService.createReportDetails = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.NOT_STARTED })

    await reportService.createReport({ crn: 'X1' }, 'creator')

    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: null,
      newStatus: ReportStatus.NOT_STARTED,
      changedBy: 'creator',
    })
  })

  it('updateReport records a history row when status changes, with the given username', async () => {
    reportDetailsService.getReportDetailsById = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.NOT_STARTED })
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED })

    await reportService.updateReport('r1', { status: ReportStatus.STARTED }, undefined, 'user1')

    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith(
      {
        reportId: 'r1',
        previousStatus: ReportStatus.NOT_STARTED,
        newStatus: ReportStatus.STARTED,
        changedBy: 'user1',
      },
      undefined
    )
  })

  it('updateReport does not record history when updates contain no status', async () => {
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED })

    await reportService.updateReport('r1', {}, undefined, 'user1')

    expect(reportDetailsService.getReportDetailsById).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('updateReport does not record history when status is unchanged', async () => {
    reportDetailsService.getReportDetailsById = jest.fn().mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED })
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED })

    await reportService.updateReport('r1', { status: ReportStatus.STARTED }, undefined, 'user1')

    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('deleteReport records previousStatus -> DELETED with the given username', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })
    reportDetailsService.deleteReportDetails = jest.fn().mockResolvedValue(true)

    await reportService.deleteReport('r1', 'user1')

    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.STARTED,
      newStatus: DELETED_STATUS,
      changedBy: 'user1',
    })
  })

  it('deleteReport records changedBy system when no username given', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })
    reportDetailsService.deleteReportDetails = jest.fn().mockResolvedValue(true)

    await reportService.deleteReport('r1')

    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.STARTED,
      newStatus: DELETED_STATUS,
      changedBy: 'system',
    })
  })
})

describe('lockReport', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  it('locks a COMPLETED report, records history, returns the updated report', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: false })
    const updated = { id: 'r1', status: ReportStatus.LOCKED }
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

    const result = await reportService.lockReport('r1', 'user1')

    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.LOCKED })
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.COMPLETED,
      newStatus: ReportStatus.LOCKED,
      changedBy: 'user1',
    })
    expect(result).toBe(updated)
  })

  it('throws 404 for an unknown id', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest.fn().mockResolvedValue(null)

    await expect(reportService.lockReport('missing', 'user1')).rejects.toMatchObject({
      status: 404,
      message: 'Report missing not found',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('throws 404 for a soft-deleted report', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: true })

    await expect(reportService.lockReport('r1', 'user1')).rejects.toMatchObject({
      status: 404,
      message: 'Report r1 not found',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('throws 409 when the report is not COMPLETED', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })

    await expect(reportService.lockReport('r1', 'user1')).rejects.toMatchObject({
      status: 409,
      message: 'Report r1 is not in a COMPLETED state',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })
})

describe('unlockReport', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  it('unlocks a LOCKED report back to COMPLETED and records history', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.LOCKED, isDeleted: false })
    const updated = { id: 'r1', status: ReportStatus.COMPLETED }
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

    const result = await reportService.unlockReport('r1', 'user1')

    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.COMPLETED })
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.LOCKED,
      newStatus: ReportStatus.COMPLETED,
      changedBy: 'user1',
    })
    expect(result).toBe(updated)
  })

  it('throws 404 for an unknown id', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest.fn().mockResolvedValue(null)

    await expect(reportService.unlockReport('missing', 'user1')).rejects.toMatchObject({
      status: 404,
      message: 'Report missing not found',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('throws 409 when the report is not LOCKED', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: false })

    await expect(reportService.unlockReport('r1', 'user1')).rejects.toMatchObject({
      status: 409,
      message: 'Report r1 is not in a LOCKED state',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })
})

it('lockReport with flag off still 409s a previously-signed STARTED report', async () => {
  const reportService = new ReportService()
  const reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
    .reportDetailsService
  const reportStatusHistoryService = (
    reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
  ).reportStatusHistoryService

  reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
    .fn()
    .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })

  await expect(reportService.lockReport('r1', 'user1')).rejects.toMatchObject({
    status: 409,
    message: 'Report r1 is not in a COMPLETED state',
  })

  expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
  expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
})

it('unlockReport with flag off always restores COMPLETED', async () => {
  const reportService = new ReportService()
  const reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
    .reportDetailsService
  const reportStatusHistoryService = (
    reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
  ).reportStatusHistoryService

  reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
    .fn()
    .mockResolvedValue({ id: 'r1', status: ReportStatus.LOCKED, isDeleted: false })
  const updated = { id: 'r1', status: ReportStatus.COMPLETED }
  reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

  const result = await reportService.unlockReport('r1', 'user1')

  expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.COMPLETED })
  expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
    reportId: 'r1',
    previousStatus: ReportStatus.LOCKED,
    newStatus: ReportStatus.COMPLETED,
    changedBy: 'user1',
  })
  expect(result).toBe(updated)
})

describe('lockReport with unlockedSigning flag on', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>
  let originalFlag: boolean

  beforeEach(() => {
    originalFlag = config.features.unlockedSigning
    config.features.unlockedSigning = true

    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  afterEach(() => {
    config.features.unlockedSigning = originalFlag
  })

  it('locks a previously-signed STARTED report, recording STARTED -> LOCKED', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })
    reportStatusHistoryService.hasEverHadStatus = jest.fn().mockResolvedValue(true)
    const updated = { id: 'r1', status: ReportStatus.LOCKED }
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

    const result = await reportService.lockReport('r1', 'user1')

    expect(reportStatusHistoryService.hasEverHadStatus).toHaveBeenCalledWith('r1', ReportStatus.COMPLETED)
    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.LOCKED })
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.STARTED,
      newStatus: ReportStatus.LOCKED,
      changedBy: 'user1',
    })
    expect(result).toBe(updated)
  })

  it('still 409s a never-signed STARTED report', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })
    reportStatusHistoryService.hasEverHadStatus = jest.fn().mockResolvedValue(false)

    await expect(reportService.lockReport('r1', 'user1')).rejects.toMatchObject({
      status: 409,
      message: 'Report r1 is not in a COMPLETED state',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('still locks a COMPLETED report as before', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: false })
    const updated = { id: 'r1', status: ReportStatus.LOCKED }
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

    const result = await reportService.lockReport('r1', 'user1')

    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.LOCKED })
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.COMPLETED,
      newStatus: ReportStatus.LOCKED,
      changedBy: 'user1',
    })
    expect(result).toBe(updated)
  })
})

describe('unlockReport with unlockedSigning flag on', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>
  let originalFlag: boolean

  beforeEach(() => {
    originalFlag = config.features.unlockedSigning
    config.features.unlockedSigning = true

    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  afterEach(() => {
    config.features.unlockedSigning = originalFlag
  })

  it('restores STARTED when the latest lock came from STARTED', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.LOCKED, isDeleted: false })
    reportStatusHistoryService.getLatestStatusChangeTo = jest
      .fn()
      .mockResolvedValue({ id: 'h1', previousStatus: ReportStatus.STARTED })
    const updated = { id: 'r1', status: ReportStatus.STARTED }
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

    const result = await reportService.unlockReport('r1', 'user1')

    expect(reportStatusHistoryService.getLatestStatusChangeTo).toHaveBeenCalledWith('r1', ReportStatus.LOCKED)
    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.STARTED })
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.LOCKED,
      newStatus: ReportStatus.STARTED,
      changedBy: 'user1',
    })
    expect(result).toBe(updated)
  })

  it('restores COMPLETED when the latest lock came from COMPLETED', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.LOCKED, isDeleted: false })
    reportStatusHistoryService.getLatestStatusChangeTo = jest
      .fn()
      .mockResolvedValue({ id: 'h1', previousStatus: ReportStatus.COMPLETED })
    const updated = { id: 'r1', status: ReportStatus.COMPLETED }
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

    const result = await reportService.unlockReport('r1', 'user1')

    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.COMPLETED })
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.LOCKED,
      newStatus: ReportStatus.COMPLETED,
      changedBy: 'user1',
    })
    expect(result).toBe(updated)
  })

  it('falls back to COMPLETED when no lock history row exists', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.LOCKED, isDeleted: false })
    reportStatusHistoryService.getLatestStatusChangeTo = jest.fn().mockResolvedValue(null)
    const updated = { id: 'r1', status: ReportStatus.COMPLETED }
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue(updated)

    const result = await reportService.unlockReport('r1', 'user1')

    expect(reportDetailsService.updateReportDetails).toHaveBeenCalledWith('r1', { status: ReportStatus.COMPLETED })
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.LOCKED,
      newStatus: ReportStatus.COMPLETED,
      changedBy: 'user1',
    })
    expect(result).toBe(updated)
  })
})

describe('deleteCompletedReport', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  it('soft-deletes a COMPLETED report and records COMPLETED -> DELETED', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: false })
    reportDetailsService.deleteReportDetails = jest.fn().mockResolvedValue(true)

    await reportService.deleteCompletedReport('r1', 'user1')

    expect(reportDetailsService.deleteReportDetails).toHaveBeenCalledWith('r1')
    expect(reportStatusHistoryService.recordStatusChange).toHaveBeenCalledWith({
      reportId: 'r1',
      previousStatus: ReportStatus.COMPLETED,
      newStatus: DELETED_STATUS,
      changedBy: 'user1',
    })
  })

  it('throws 404 for a soft-deleted report', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: true })

    await expect(reportService.deleteCompletedReport('r1', 'user1')).rejects.toMatchObject({
      status: 404,
      message: 'Report r1 not found',
    })

    expect(reportDetailsService.deleteReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('throws 409 when the report is not COMPLETED', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })

    await expect(reportService.deleteCompletedReport('r1', 'user1')).rejects.toMatchObject({
      status: 409,
      message: 'Report r1 is not in a COMPLETED state',
    })

    expect(reportDetailsService.deleteReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })
})

describe('reopenReport', () => {
  let reportService: ReportService
  let reportDetailsService: jest.Mocked<ReportDetailsService>
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>

  beforeEach(() => {
    reportService = new ReportService()
    reportDetailsService = (reportService as unknown as { reportDetailsService: jest.Mocked<ReportDetailsService> })
      .reportDetailsService
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  it('clears signature fields, nulls submittedAt, sets STARTED via the audited updateReport seam with the username', async () => {
    const pages = [
      {
        name: 'sign-your-report',
        questions: [
          { id: 0, value: 'signReportName', answer: 'Jane Doe' },
          { id: 1, value: 'professionalStatus', answer: 'Officer' },
        ],
      },
      {
        name: 'other-page',
        questions: [{ id: 0, value: 'someQuestion', answer: 'someAnswer' }],
      },
    ]
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: false, pages })
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED })

    const updateReportSpy = jest.spyOn(reportService, 'updateReport')

    await reportService.reopenReport('r1', 'user1')

    expect(updateReportSpy).toHaveBeenCalledTimes(1)
    expect(updateReportSpy).toHaveBeenCalledWith(
      'r1',
      {
        status: ReportStatus.STARTED,
        submittedAt: null,
        pages: [
          { name: 'sign-your-report', questions: [] },
          { name: 'other-page', questions: [{ id: 0, value: 'someQuestion', answer: 'someAnswer' }] },
        ],
      },
      undefined,
      'user1'
    )
  })

  it('passes pages through unchanged when the sign-your-report page is absent', async () => {
    const pages = [{ name: 'other-page', questions: [{ id: 0, value: 'someQuestion', answer: 'someAnswer' }] }]
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: false, pages })
    reportDetailsService.updateReportDetails = jest.fn().mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED })

    const updateReportSpy = jest.spyOn(reportService, 'updateReport')

    await reportService.reopenReport('r1', 'user1')

    expect(updateReportSpy).toHaveBeenCalledWith(
      'r1',
      { status: ReportStatus.STARTED, submittedAt: null, pages },
      undefined,
      'user1'
    )
  })

  it('throws 404 for unknown or soft-deleted reports and writes nothing', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest.fn().mockResolvedValue(null)

    await expect(reportService.reopenReport('missing', 'user1')).rejects.toMatchObject({
      status: 404,
      message: 'Report missing not found',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()

    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.COMPLETED, isDeleted: true })

    await expect(reportService.reopenReport('r1', 'user1')).rejects.toMatchObject({
      status: 404,
      message: 'Report r1 not found',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('throws 409 for a STARTED (never-signed) report and writes nothing', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.STARTED, isDeleted: false })

    await expect(reportService.reopenReport('r1', 'user1')).rejects.toMatchObject({
      status: 409,
      message: 'Report r1 is not in a COMPLETED state',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })

  it('throws 409 for a LOCKED report and writes nothing', async () => {
    reportDetailsService.getReportDetailsByIdIncludingDeleted = jest
      .fn()
      .mockResolvedValue({ id: 'r1', status: ReportStatus.LOCKED, isDeleted: false })

    await expect(reportService.reopenReport('r1', 'user1')).rejects.toMatchObject({
      status: 409,
      message: 'Report r1 is not in a COMPLETED state',
    })

    expect(reportDetailsService.updateReportDetails).not.toHaveBeenCalled()
    expect(reportStatusHistoryService.recordStatusChange).not.toHaveBeenCalled()
  })
})

describe('hasReportBeenSigned', () => {
  let reportService: ReportService
  let reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService>

  beforeEach(() => {
    reportService = new ReportService()
    reportStatusHistoryService = (
      reportService as unknown as { reportStatusHistoryService: jest.Mocked<ReportStatusHistoryService> }
    ).reportStatusHistoryService
  })

  it('delegates to reportStatusHistoryService.hasEverHadStatus with ReportStatus.COMPLETED', async () => {
    reportStatusHistoryService.hasEverHadStatus = jest.fn().mockResolvedValue(true)

    const result = await reportService.hasReportBeenSigned('r1')

    expect(reportStatusHistoryService.hasEverHadStatus).toHaveBeenCalledWith('r1', ReportStatus.COMPLETED)
    expect(result).toBe(true)
  })

  it('returns false when the report has never been COMPLETED', async () => {
    reportStatusHistoryService.hasEverHadStatus = jest.fn().mockResolvedValue(false)

    const result = await reportService.hasReportBeenSigned('r1')

    expect(result).toBe(false)
  })
})
