import { Request, Response } from 'express'
import BaseController from './baseController'

export default class LandingPageController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/landing`, {
      ...this.templateValues,
      timestamp: '',
    })
  }
}
