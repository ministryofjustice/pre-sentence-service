import { EntityManager, getConnection } from 'typeorm'
import ReportStatusHistoryService from './reportStatusHistoryService'

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  getConnection: jest.fn(),
}))

describe('ReportStatusHistoryService', () => {
  let reportStatusHistoryService: ReportStatusHistoryService
  let repository: { save: jest.Mock; delete: jest.Mock; count: jest.Mock; findOne: jest.Mock }

  beforeEach(() => {
    jest.clearAllMocks()
    reportStatusHistoryService = new ReportStatusHistoryService()
    repository = {
      save: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      findOne: jest.fn(),
    }
    ;(getConnection as jest.Mock).mockReturnValue({
      manager: {
        getRepository: jest.fn().mockReturnValue(repository),
      },
    })
  })

  it('recordStatusChange saves a row with the given fields and a changedAt date', async () => {
    repository.save.mockResolvedValue({})

    await reportStatusHistoryService.recordStatusChange({
      reportId: 'r1',
      previousStatus: null,
      newStatus: 'NOT_STARTED',
      changedBy: 'user1',
    })

    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        reportId: 'r1',
        previousStatus: null,
        newStatus: 'NOT_STARTED',
        changedBy: 'user1',
        changedAt: expect.any(Date),
      })
    )
  })

  it('recordStatusChange uses the provided EntityManager when given', async () => {
    repository.save.mockResolvedValue({})
    const manager = {
      getRepository: jest.fn().mockReturnValue(repository),
    } as unknown as EntityManager

    await reportStatusHistoryService.recordStatusChange(
      {
        reportId: 'r1',
        previousStatus: null,
        newStatus: 'NOT_STARTED',
        changedBy: 'user1',
      },
      manager
    )

    expect(manager.getRepository).toHaveBeenCalled()
    expect(getConnection).not.toHaveBeenCalled()
  })

  it('removeStatusChange deletes the row by id', async () => {
    repository.delete.mockResolvedValue({})

    await reportStatusHistoryService.removeStatusChange('h1')

    expect(repository.delete).toHaveBeenCalledWith('h1')
  })

  it('hasEverHadStatus matches on newStatus', async () => {
    repository.count.mockResolvedValue(1)

    const result = await reportStatusHistoryService.hasEverHadStatus('r1', 'COMPLETED')

    expect(repository.count).toHaveBeenCalledWith({
      where: [
        { reportId: 'r1', newStatus: 'COMPLETED' },
        { reportId: 'r1', previousStatus: 'COMPLETED' },
      ],
    })
    expect(result).toBe(true)
  })

  it('hasEverHadStatus matches on previousStatus (legacy backfilled report whose only row is COMPLETED -> STARTED)', async () => {
    repository.count.mockResolvedValue(1)

    const result = await reportStatusHistoryService.hasEverHadStatus('r1', 'COMPLETED')

    expect(repository.count).toHaveBeenCalledWith({
      where: [
        { reportId: 'r1', newStatus: 'COMPLETED' },
        { reportId: 'r1', previousStatus: 'COMPLETED' },
      ],
    })
    expect(result).toBe(true)
  })

  it('hasEverHadStatus returns false when no row matches', async () => {
    repository.count.mockResolvedValue(0)

    const result = await reportStatusHistoryService.hasEverHadStatus('r1', 'COMPLETED')

    expect(result).toBe(false)
  })

  it('getLatestStatusChangeTo returns the most recent row with that newStatus, null when none', async () => {
    const row = {
      id: 'h1',
      reportId: 'r1',
      previousStatus: 'STARTED',
      newStatus: 'COMPLETED',
      changedBy: 'user1',
      changedAt: new Date(),
    }
    repository.findOne.mockResolvedValue(row)

    const result = await reportStatusHistoryService.getLatestStatusChangeTo('r1', 'COMPLETED')

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { reportId: 'r1', newStatus: 'COMPLETED' },
      order: { changedAt: 'DESC' },
    })
    expect(result).toBe(row)
  })

  it('getLatestStatusChangeTo returns null when no row matches', async () => {
    repository.findOne.mockResolvedValue(undefined)

    const result = await reportStatusHistoryService.getLatestStatusChangeTo('r1', 'COMPLETED')

    expect(result).toBeNull()
  })
})
