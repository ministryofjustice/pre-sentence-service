import { EntityManager } from 'typeorm'
import SourcesOfInformationService from './sourcesOfInformationService'
import SourcesOfInformation from '../repositories/entities/sourcesOfInformation'
import ReportSourcesOfInformation from '../repositories/entities/reportSourcesOfInformation'

describe('SourcesOfInformationService', () => {
  describe('hasDuplicateSourceForReport', () => {
    it('treats sources with different casing and repeated whitespace as duplicates', async () => {
      const service = new SourcesOfInformationService()

      jest.spyOn(service, 'getSourcesOfInformation').mockResolvedValue([
        {
          key: 'test test',
          value: 'Test Test',
          isCustom: true,
        },
      ])

      await expect(service.hasDuplicateSourceForReport('123', '  test   test  ')).resolves.toBe(true)
    })

    it('returns false when the source does not already exist for the report', async () => {
      const service = new SourcesOfInformationService()

      jest.spyOn(service, 'getSourcesOfInformation').mockResolvedValue([
        {
          key: 'cps_summary',
          value: 'CPS summary',
          isCustom: false,
        },
      ])

      await expect(service.hasDuplicateSourceForReport('123', 'interview notes')).resolves.toBe(false)
    })
  })

  describe('addCustomSourceOfInformation', () => {
    it('normalises whitespace before saving a custom source', async () => {
      const service = new SourcesOfInformationService()

      const sourceRepo = {
        create: jest.fn(value => value),
        save: jest.fn().mockResolvedValue({ id: 99 }),
      }

      const reportSourceRepo = {
        create: jest.fn(value => value),
        save: jest.fn().mockResolvedValue(undefined),
      }

      const manager = {
        getRepository: jest.fn(repository => {
          if (repository === SourcesOfInformation) return sourceRepo
          if (repository === ReportSourcesOfInformation) return reportSourceRepo
          throw new Error('Unexpected repository')
        }),
      } as unknown as EntityManager

      await service.addCustomSourceOfInformation('123', '  Test   Test  ', 'testuser', manager)

      expect(sourceRepo.create).toHaveBeenCalledWith({
        name: 'Test Test',
        value: 'Test Test',
        isDefault: false,
        source: 'custom',
        createdBy: 'testuser',
        isDeleted: false,
        version: 1,
      })

      expect(reportSourceRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          reportId: '123',
          sourcesOfInformationId: 99,
          createdBy: 'testuser',
          lastUpdatedBy: 'testuser',
          isDeleted: false,
          version: 1,
        })
      )

      expect(reportSourceRepo.save).toHaveBeenCalled()
    })
  })
})
