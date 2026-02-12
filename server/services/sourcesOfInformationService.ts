import { getConnection, In } from 'typeorm'
import SourcesOfInformation from '../repositories/entities/sourcesOfInformation'
import ReportSourcesOfInformation from '../repositories/entities/reportSourcesOfInformation'
import { SourceOfInformation, CustomSource, SourceKey } from '../utils/sourcesOfInformationHelpers'

export interface ISourcesOfInformation {
  id?: number
  name: string
  value: string
  isDefault: boolean
  source: string
  createdBy?: string
  isDeleted?: boolean
  version?: number
}

export default class SourcesOfInformationService {
  public async getSourcesOfInformation(reportId: string): Promise<SourceOfInformation[]> {
    // Get default sources
    const defaultSources = await getConnection()
      .getRepository(SourcesOfInformation)
      .find({
        where: {
          isDefault: true,
          isDeleted: false,
        },
      })

    // Get custom sources linked to this report
    const reportSources = await getConnection()
      .getRepository(ReportSourcesOfInformation)
      .find({
        where: {
          reportId,
          isDeleted: false,
        },
        relations: ['sourcesOfInformation'],
      })

    // Combine and map to SourceOfInformation format
    const allSources: SourceOfInformation[] = [
      ...defaultSources.map(s => ({
        key: s.value,
        value: s.name,
        isCustom: false,
      })),
      ...reportSources.map(rs => ({
        key: rs.sourcesOfInformation.value,
        value: rs.sourcesOfInformation.name,
        isCustom: true,
      })),
    ]

    return allSources
  }

  public async saveCustomSourcesOfInformation(
    reportId: string,
    addedSources: CustomSource[],
    removedSources: SourceKey[],
    createdBy: string
  ): Promise<void> {
    const sourceRepo = getConnection().getRepository(SourcesOfInformation)
    const reportSourceRepo = getConnection().getRepository(ReportSourcesOfInformation)

    // Handle removed sources
    if (removedSources.length > 0) {
      // Find the source IDs to remove
      const sourcesToRemove = await sourceRepo.find({
        where: {
          value: In(removedSources),
          isDefault: false,
        },
      })

      const sourceIdsToRemove = sourcesToRemove.map(s => s.id)

      // Soft delete the report-source links
      if (sourceIdsToRemove.length > 0) {
        const reportSourceLinks = await reportSourceRepo.find({
          where: {
            reportId,
            sourcesOfInformationId: In(sourceIdsToRemove),
          },
        })

        for (const link of reportSourceLinks) {
          await reportSourceRepo.update(link.id, {
            isDeleted: true,
            lastUpdatedAt: new Date(),
          })
        }

        // Also soft delete the custom sources themselves
        for (const sourceId of sourceIdsToRemove) {
          await sourceRepo.update(sourceId, {
            isDeleted: true,
          })
        }
      }
    }

    // Handle added sources
    if (addedSources.length > 0) {
      for (const customSource of addedSources) {
        // Create the custom source
        const newSource = sourceRepo.create({
          name: customSource.value,
          value: customSource.key,
          isDefault: false,
          source: 'custom',
          createdBy,
          isDeleted: false,
          version: 1,
        })

        const savedSource = await sourceRepo.save(newSource)

        // Link it to the report
        const reportSourceLink = reportSourceRepo.create({
          reportId,
          sourcesOfInformationId: savedSource.id,
          createdBy,
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          lastUpdatedBy: createdBy,
          isDeleted: false,
          version: 1,
        })

        await reportSourceRepo.save(reportSourceLink)
      }
    }
  }

  public async createDefaultSource(sourceData: ISourcesOfInformation): Promise<SourcesOfInformation> {
    const sourceRepository = getConnection().getRepository(SourcesOfInformation)
    const source = sourceRepository.create({
      ...sourceData,
      isDefault: true,
      isDeleted: false,
      version: 1,
    })
    return sourceRepository.save(source)
  }

  public async getAllDefaultSources(): Promise<SourcesOfInformation[]> {
    return getConnection()
      .getRepository(SourcesOfInformation)
      .find({
        where: {
          isDefault: true,
          isDeleted: false,
        },
      })
  }
}
