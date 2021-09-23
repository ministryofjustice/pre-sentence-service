import { Request, Response } from 'express'
import BaseController from './baseController'

export default class OffenceDetailsController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/offence-details`, this.templateValues)
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect(`/${this.path}/offence-analysis`)
  }
}
