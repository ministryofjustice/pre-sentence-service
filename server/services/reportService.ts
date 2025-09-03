import { getRepository, In, InsertResult, IsNull } from 'typeorm'

import Report from '../repositories/entities/report'
import ReportDefinition from '../repositories/entities/reportDefinition'
import FieldValue from '../repositories/entities/fieldValue'
import Source from '../repositories/entities/source'

export interface IReport {
  id?: string
  entityId?: string
  reportDefinitionId: number
}

export interface IFieldValue {
  id?: number
  reportId: string
  fieldId: number
  value: string
  version: number
}

export interface SourceOfInformation {
  key: string
  value: string
  isCustom: boolean
  checked?: boolean
}

export default class ReportService {
  public async createReport(report: IReport): Promise<Report> {
    const reportRepository = getRepository(Report)
    const result = await reportRepository.create(report)
    return reportRepository.save(result)
  }

  public getReportById(id: string): Promise<Report> {
    return getRepository(Report).findOne({
      where: {
        id,
      },
      relations: ['reportDefinition', 'reportDefinition.fields'],
    })
  }

  public async getSourcesOfInformation(reportId: string): Promise<SourceOfInformation[]> {
    const sources = await getRepository(Source).find({
      where: [{ reportId: IsNull() }, { reportId }],
    })

    return sources.map<SourceOfInformation>(s => ({
      key: s.key,
      value: s.label,
      isCustom: s.reportId !== null,
    }))
  }

  public async saveCustomSourcesOfInformation(
    reportId: string,
    addedSources: Partial<SourceOfInformation>[],
    removedSources: string[]
  ): Promise<void> {
    const repo = await getRepository(Source)

    if (removedSources.length > 0) {
      await repo.delete({
        reportId,
        key: In(removedSources),
      })

      // Manually remove custom field from field_value.value if present (made necessary by current DB structure)
      const fieldId = 26 // Magic number for sources of information field ID
      const foundFieldValue = await getRepository(FieldValue).findOne({ where: { reportId, fieldId } })
      if (foundFieldValue && foundFieldValue.value) {
        const valueArr = foundFieldValue.value.split(',')
        const updatedFieldValue = valueArr.filter(x => removedSources.some(y => y !== x)).join(',')
        if (updatedFieldValue.length > 0) {
          await getRepository(FieldValue).update(foundFieldValue.id, {
            ...foundFieldValue,
            value: updatedFieldValue,
            version: foundFieldValue.version + 1,
          })
        } else {
          await getRepository(FieldValue).delete(foundFieldValue.id)
        }
      }
    }

    if (addedSources.length > 0) {
      const toInsert = addedSources.map(x =>
        repo.create({
          key: x.key,
          label: x.value,
          reportId,
        })
      )
      await repo.save(toInsert)
    }
  }

  public getAllReportsByType(type: string): Promise<Report[]> {
    return getRepository(Report).find({
      where: {
        reportDefinition: {
          type,
        },
      },
      relations: ['reportDefinition'],
    })
  }

  public updateReport(updatedReport: Report): Promise<InsertResult> {
    return getRepository(Report).upsert(updatedReport, ['id'])
  }

  public deleteReport(report: Report): Promise<Report> {
    return getRepository(Report).remove(report)
  }

  public updateFieldValues(fieldValues: Array<IFieldValue>): Promise<void[]> {
    return Promise.all(
      fieldValues.map(async fieldValue => {
        const { reportId, fieldId } = fieldValue
        const foundFieldValue = await getRepository(FieldValue).findOne({ where: { reportId, fieldId } })
        if (foundFieldValue) {
          if (fieldValue.value === null) {
            await getRepository(FieldValue).delete(foundFieldValue.id)
          } else {
            await getRepository(FieldValue).update(foundFieldValue.id, {
              ...fieldValue,
              version: fieldValue.version + 1,
            })
          }
        } else if (fieldValue.value !== null) {
          await getRepository(FieldValue).insert(fieldValue)
        }
      })
    )
  }

  public getDefinitionByType(type: string): Promise<ReportDefinition> {
    return getRepository(ReportDefinition).findOne({
      select: ['id'],
      where: {
        type,
      },
    })
  }
}
