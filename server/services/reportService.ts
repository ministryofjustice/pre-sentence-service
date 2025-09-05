import { getRepository, In, InsertResult, IsNull } from 'typeorm'

import Report from '../repositories/entities/report'
import ReportDefinition from '../repositories/entities/reportDefinition'
import FieldValue from '../repositories/entities/fieldValue'
import Source from '../repositories/entities/source'
import { CustomSource, SourceKey, SourceOfInformation } from '../utils/sourcesOfInformationHelpers'
import Field from '../repositories/entities/field'

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
    addedSources: CustomSource[],
    removedSources: SourceKey[]
  ): Promise<void> {
    const sourceRepo = await getRepository(Source)

    if (removedSources.length > 0) {
      await sourceRepo.delete({
        reportId,
        key: In(removedSources),
      })

      // Manually remove custom field from field_value.value if present (made necessary by current DB structure)
      const fieldId = (await getRepository(Field).findOne({ where: { name: 'sourcesOfInformation' } })).id
      const fvRepo = await getRepository(FieldValue)
      const fv = await fvRepo.findOne({ where: { reportId, fieldId } })
      if (fv && fv.value) {
        const updatedFieldValue = fv.value
          .split(',')
          .filter(s => !removedSources.includes(s))
          .join(',')
        if (updatedFieldValue.length > 0) {
          await fvRepo.update(fv.id, {
            ...fv,
            value: updatedFieldValue,
            version: fv.version + 1,
          })
        } else {
          await fvRepo.delete(fv.id)
        }
      }
    }

    if (addedSources.length > 0) {
      const toInsert = addedSources.map(x =>
        sourceRepo.create({
          key: x.key,
          label: x.value,
          reportId,
        })
      )
      await sourceRepo.save(toInsert)
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
