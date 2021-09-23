import { Request, Response } from 'express'
import BaseController from './baseController'

export default class OffenceAnalysisController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render('record-of-oral/offence-analysis', this.templateValues)
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect('/record-of-oral/offender-assessment')
  }
}
