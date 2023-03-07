import { Request, Response } from 'express'

import { IFieldValue } from '../../services/reportService'
import SharedController from './sharedController'
import Report from '../../repositories/entities/report'

interface IPageField {
  id: string
  value: string
}

export default class AutoSaveController extends SharedController {
  protected override updateFields = async (
    pageFields: Array<IPageField>,
    overrideBoolean: boolean,
    report: Report = undefined
  ) => {
    const fieldValues: Array<IFieldValue> = []
    console.log(JSON.stringify(report.fieldValues))
    if (report && report.reportDefinition && report.reportDefinition.fields) {
      report.reportDefinition.fields.forEach(item => {
        pageFields.forEach(field => {
          if (item.name === field.id) {
            const fieldValue = report.fieldValues.find(value => field.id === value.field.name)
            fieldValues.push({
              reportId: report.id,
              fieldId: item.id,
              value: field.value,
              version: fieldValue && fieldValue.version ? fieldValue.version : 1,
            })
            if (fieldValue) {
              fieldValue.version += 1
            }
          }
        })
      })
    }
    if (fieldValues.length) {
      await this.reportService.updateFieldValues(fieldValues)
    }
  }

  public override post = async (req: Request, res: Response): Promise<void> => {
    const report = await this.reportService.getReportById(req.params.reportId)
    if (this.checkFieldValueVersions(req, report)) {
      await this.updateFields(req.body, false, report)
      req.session.fieldValues = report.fieldValues
      res.status(201)
      res.send()
    } else {
      res.status(409)
      res.send()
    }
  }
}
