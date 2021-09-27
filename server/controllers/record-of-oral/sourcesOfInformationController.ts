import { Request, Response } from 'express'
import BaseController from './baseController'

export default class SourcesOfInformationController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/sources-of-information`, this.templateValues)
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect(`/${this.path}/check-report`)
  }
}
