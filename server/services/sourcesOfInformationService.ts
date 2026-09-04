import { EntityManager, getConnection } from 'typeorm'
import SourcesOfInformation from '../repositories/entities/sourcesOfInformation'
import ReportSourcesOfInformation from '../repositories/entities/reportSourcesOfInformation'
import { SourceOfInformation } from '../utils/sourcesOfInformationHelpers'

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
  public async sourceExistsForReport(reportId: string, value: string): Promise<boolean> {
    const normalizedValue = value.trim().toLocaleLowerCase()

    const sources = await this.getSourcesOfInformation(reportId)

    return sources.some(source => {
      return (
        source.key.trim().toLocaleLowerCase() === normalizedValue ||
        source.value.trim().toLocaleLowerCase() === normalizedValue
      )
    })
  }

  public async addCustomSourceOfInformation(
    reportId: string,
    value: string,
    createdBy: string,
    manager: EntityManager = getConnection().manager
  ): Promise<void> {
    const sourceRepo = manager.getRepository(SourcesOfInformation)
    const reportSourceRepo = manager.getRepository(ReportSourcesOfInformation)

    // Create a new custom source
    const source = await sourceRepo.save(
      sourceRepo.create({
        name: value,
        value,
        isDefault: false,
        source: 'custom',
        createdBy,
        isDeleted: false,
        version: 1,
      })
    )

    // Link the new custom source to the report
    await reportSourceRepo.save(
      reportSourceRepo.create({
        reportId,
        sourcesOfInformationId: source.id,
        createdBy,
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        lastUpdatedBy: createdBy,
        isDeleted: false,
        version: 1,
      })
    )
  }

  public async removeCustomSourceOfInformation(
    reportId: string,
    key: string,
    manager: EntityManager = getConnection().manager
  ): Promise<void> {
    const sourceRepo = manager.getRepository(SourcesOfInformation)
    const reportSourceRepo = manager.getRepository(ReportSourcesOfInformation)

    // Find this report's own link to a custom source with the given name
    const link = await reportSourceRepo.findOne({
      where: {
        reportId,
        isDeleted: false,
        sourcesOfInformation: {
          name: key,
          isDefault: false,
          isDeleted: false,
        },
      },
      relations: ['sourcesOfInformation'],
    })

    if (!link) return

    // Soft delete the report's link to this source
    await reportSourceRepo.update(link.id, {
      isDeleted: true,
      lastUpdatedAt: new Date(),
    })

    // Soft delete the custom source itself
    await sourceRepo.update(link.sourcesOfInformationId, {
      isDeleted: true,
    })
  }

  public async getSourcesOfInformation(
    reportId: string,
    manager: EntityManager = getConnection().manager
  ): Promise<SourceOfInformation[]> {
    // Get default sources
    const defaultSources = await manager.getRepository(SourcesOfInformation).find({
      where: {
        isDefault: true,
        isDeleted: false,
      },
    })

    // Get sources linked to this report
    const reportSources = await manager.getRepository(ReportSourcesOfInformation).find({
      where: {
        reportId,
        isDeleted: false,
      },
      relations: ['sourcesOfInformation'],
    })

    // Only treat report-linked rows as custom if they aren't actually a default source
    const customReportSources = reportSources.filter(
      reportSource => reportSource.sourcesOfInformation?.isDefault === false
    )

    // Combine default and custom sources into a single list
    return [
      ...defaultSources.map(source => ({
        key: source.name,
        value: source.value,
        isCustom: false,
      })),
      ...customReportSources.map(reportSource => ({
        key: reportSource.sourcesOfInformation.name,
        value: reportSource.sourcesOfInformation.value,
        isCustom: true,
      })),
    ]
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
