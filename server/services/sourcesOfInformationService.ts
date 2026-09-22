import { SourcesOfInformationRepository, ReportSourcesOfInformationRepository } from '../repositories/sourcesOfInformationRepository'
import SourcesOfInformation from '../repositories/entities/sourcesOfInformation'
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
  constructor(
    private readonly sourcesRepository = new SourcesOfInformationRepository(),
    private readonly reportSourcesRepository = new ReportSourcesOfInformationRepository()
  ) {}

  public async getSourcesOfInformation(reportId: string): Promise<SourceOfInformation[]> {
    const defaultSources = await this.sourcesRepository.findAllDefault()
    const reportSources = await this.reportSourcesRepository.findByReportId(reportId)

    return [
      ...defaultSources.map(s => ({ key: s.name, value: s.value, isCustom: false })),
      ...reportSources.map(rs => ({
        key: rs.sourcesOfInformation.name,
        value: rs.sourcesOfInformation.value,
        isCustom: true,
      })),
    ]
  }

  public async saveCustomSourcesOfInformation(
    reportId: string,
    addedSources: CustomSource[],
    removedSources: SourceKey[],
    createdBy: string
  ): Promise<void> {
    if (removedSources.length > 0) {
      const sourcesToRemove = await this.sourcesRepository.findCustomByValues(removedSources)
      const sourceIdsToRemove = sourcesToRemove.map(s => s.id)

      if (sourceIdsToRemove.length > 0) {
        const reportSourceLinks = await this.reportSourcesRepository.findByReportIdAndSourceIds(
          reportId,
          sourceIdsToRemove
        )

        for (const link of reportSourceLinks) {
          await this.reportSourcesRepository.update(link.id, {
            isDeleted: true,
            lastUpdatedAt: new Date(),
          })
        }

        for (const sourceId of sourceIdsToRemove) {
          await this.sourcesRepository.update(sourceId, { isDeleted: true })
        }
      }
    }

    if (addedSources.length > 0) {
      for (const customSource of addedSources) {
        const newSource = this.sourcesRepository.create({
          name: customSource.value,
          value: customSource.key,
          isDefault: false,
          source: 'custom',
          createdBy,
          isDeleted: false,
          version: 1,
        })
        const savedSource = await this.sourcesRepository.save(newSource)

        const reportSourceLink = this.reportSourcesRepository.create({
          reportId,
          sourcesOfInformationId: savedSource.id,
          createdBy,
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          lastUpdatedBy: createdBy,
          isDeleted: false,
          version: 1,
        })
        await this.reportSourcesRepository.save(reportSourceLink)
      }
    }
  }

  public async createDefaultSource(sourceData: ISourcesOfInformation): Promise<SourcesOfInformation> {
    const source = this.sourcesRepository.create({
      ...sourceData,
      isDefault: true,
      isDeleted: false,
      version: 1,
    })
    return this.sourcesRepository.save(source)
  }

  public async getAllDefaultSources(): Promise<SourcesOfInformation[]> {
    return this.sourcesRepository.findAllDefault()
  }
}