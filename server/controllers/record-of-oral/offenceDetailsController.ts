import { Request, Response } from 'express'
import BaseController from './baseController'

export default class OffenceDetailsController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render('record-of-oral/offence-details', this.templateValues)
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect('/record-of-oral/offence-analysis')
  }
}
