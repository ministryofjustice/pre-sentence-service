import { getConnection, In } from 'typeorm'
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
  public async addCustomSourceOfInformation(
    reportId: string,
    value: string,
    createdBy: string
  ): Promise<void> {
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

    // Find the custom source by key (name) and ensure it's not a default source
    const source = await sourceRepo.findOne({
      where: {
        name: key,
        isDefault: false,
        isDeleted: false,
      },
    })

    if (!source?.id) return

    // Soft delete the link between the report and the source
    const link = await reportSourceRepo.findOne({
      where: {
        reportId,
        sourcesOfInformationId: source.id,
        isDeleted: false,
      },
    })

    // Soft delete the link and the source itself
    if (link) {
      await reportSourceRepo.update(link.id, {
        isDeleted: true,
        lastUpdatedAt: new Date(),
      })
    }

    await sourceRepo.update(source.id, {
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
        key: s.name,
        value: s.value,
        isCustom: false,
      })),
      ...reportSources.map(rs => ({
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
