import { Request, Response } from 'express'
import BaseController from './baseController'

export default class ProposalController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/proposal`, this.templateValues)
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect(`/${this.path}/sources-of-information`)
  }
}
