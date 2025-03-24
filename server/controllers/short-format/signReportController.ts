import { Response } from 'express'
import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'
import { TemplateValues } from '../shared/sharedController'
import logger from '../../../logger'

export const pageFields: Array<string> = [
  'reportAuthor',
  'office',
  'officePhoneNumber',
  'counterSignature',
  'startDate-day',
  'startDate-month',
  'startDate-year',
  'completionDate-day',
  'completionDate-month',
  'completionDate-year',
]

export default class SignReportController extends BaseController {
  override templatePath = 'sign-report'

  override redirectPath = 'report-completed'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'reportAuthor',
        errorMessage: 'Enter the report author',
      },
      {
        id: 'office',
        errorMessage: 'Enter the office',
      },
      {
        id: 'officePhoneNumber',
        errorMessage: 'Enter the court office phone number',
      },
      {
        id: 'completionDate-day',
        errorMessage: 'Enter a valid day',
      },
      {
        id: 'completionDate-month',
        errorMessage: 'Enter a valid month',
      },
      {
        id: 'completionDate-year',
        errorMessage: 'Enter a valid year',
        minLength: 4,
      },
    ],
  }

  private today = new Date()

  override defaultTemplateData = {
    'completionDate-day': `0${this.today.getDate()}`.slice(-2),
    'completionDate-month': `0${this.today.getMonth() + 1}`.slice(-2),
    'completionDate-year': this.today.getFullYear(),
  }

  override additionalPostAction = async () => {
    if (this.report) {
      try {
        await this.reportService.updateReport({ ...this.report, status: 'COMPLETED' })
        await this.eventService.sendReportEvent({
          reportId: this.report.id,
          eventNumber: this.report.eventNumber,
          crn: this.data.crn,
          reportStatus: 'completed',
        })
      } catch (e: unknown) {
        logger.error('Update completed report failed:', e)
      }
    }
  }

  override renderTemplate(res: Response, templateValues: TemplateValues) {
    res.render(`${this.path}/${this.templatePath}`, {
      ...templateValues,
      data: {
        reportAuthor: res.locals && res.locals.user && res.locals.user.displayName ? res.locals.user.displayName : '',
        ...templateValues.data,
      },
    })
  }
}
