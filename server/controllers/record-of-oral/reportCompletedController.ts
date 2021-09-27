import { Request, Response } from 'express'
import BaseController from './baseController'

export default class ReportCompletedController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/report-saved`, {
      ...this.templateValues,
      reportCompleted: true,
    })
  }
}
