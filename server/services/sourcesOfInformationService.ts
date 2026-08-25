import { getConnection } from 'typeorm'
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

  public async addCustomSourceOfInformation(reportId: string, value: string, createdBy: string): Promise<void> {
    const sourceRepo = getConnection().getRepository(SourcesOfInformation)
    const reportSourceRepo = getConnection().getRepository(ReportSourcesOfInformation)

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

  public async removeCustomSourceOfInformation(reportId: string, key: string): Promise<void> {
    const sourceRepo = getConnection().getRepository(SourcesOfInformation)
    const reportSourceRepo = getConnection().getRepository(ReportSourcesOfInformation)

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

    // Get sources linked to this report
    const reportSources = await getConnection()
      .getRepository(ReportSourcesOfInformation)
      .find({
        where: {
          reportId,
          isDeleted: false,
        },
        relations: ['sourcesOfInformation'],
      })

    // Only treat report-linked rows as custom if they aren't actually a default source
    const customReportSources = reportSources.filter(rs => rs.sourcesOfInformation?.isDefault === false)

    const allSources: SourceOfInformation[] = [
      ...defaultSources.map(s => ({
        key: s.name,
        value: s.value,
        isCustom: false,
      })),
      ...customReportSources.map(rs => ({
        key: rs.sourcesOfInformation.name,
        value: rs.sourcesOfInformation.value,
        isCustom: true,
      })),
    ]

    return allSources
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
