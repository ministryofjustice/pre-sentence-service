import { Request, Response } from 'express'
import BaseController from './baseController'

export default class SignReportController extends BaseController {
  today = new Date()

  tmpDummySignReportData = {
    author: 'Arthur Author',
    office: "Probation office, Sheffield Magistrate's Court",
    telephone: '0114 276 0760',
    completionDate: {
      day: this.today.getDate(),
      month: this.today.getMonth() + 1,
      year: this.today.getFullYear(),
    },
  }

  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/sign-report`, {
      ...this.templateValues,
      data: this.tmpDummySignReportData,
    })
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect(`/${this.path}/report-completed`)
  }
}
