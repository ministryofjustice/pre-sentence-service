import { Request, Response } from 'express'

import { IFieldValue } from '../../services/reportService'
import SharedController from './sharedController'

interface IPageField {
  id: string
  value: string
}

export default class AutoSaveController extends SharedController {
  protected override updateFields = async (pageFields: Array<IPageField>) => {
    const fieldValues: Array<IFieldValue> = []
    if (this.report && this.report.reportDefinition && this.report.reportDefinition.fields) {
      this.report.reportDefinition.fields.forEach(item => {
        pageFields.forEach(field => {
          if (item.name === field.id) {
            const fieldValue = this.report.fieldValues.find(value => field.id === value.field.name)
            fieldValues.push({
              reportId: this.report.id,
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
    this.report = await this.reportService.getReportById(req.params.reportId)
    if (this.checkFieldValueVersions(req)) {
      await this.updateFields(req.body)
      req.session.fieldValues = this.report.fieldValues
      res.status(201)
      res.send()
    } else {
      res.status(409)
      res.send()
    }
  }
}
