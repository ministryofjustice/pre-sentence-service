import { Request, Response } from 'express'
import BaseController from './baseController'

export default class CheckReportController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/check-report`, this.templateValues)
  }
}
