import { getRepository, InsertResult } from 'typeorm'

import Report from '../repositories/entities/report'
import ReportDefinition from '../repositories/entities/reportDefinition'
import FieldValue from '../repositories/entities/fieldValue'

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

  public updateFieldValues(fieldValues: Array<IFieldValue>): Promise<void[]> {
    return Promise.all(
      fieldValues.map(async fieldValue => {
        const { reportId, fieldId } = fieldValue
        const foundFieldValue = await getRepository(FieldValue).findOne({ where: { reportId, fieldId } })
        // @TODO: Enforce field value version - see PIC-1953
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
