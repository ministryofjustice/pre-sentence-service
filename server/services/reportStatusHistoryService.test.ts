import { EntityManager, getConnection } from 'typeorm'
import ReportStatusHistoryService from './reportStatusHistoryService'

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  getConnection: jest.fn(),
}))

describe('ReportStatusHistoryService', () => {
  let reportStatusHistoryService: ReportStatusHistoryService
  let repository: { save: jest.Mock; delete: jest.Mock }

  beforeEach(() => {
    jest.clearAllMocks()
    reportStatusHistoryService = new ReportStatusHistoryService()
    repository = {
      save: jest.fn(),
      delete: jest.fn(),
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
})
