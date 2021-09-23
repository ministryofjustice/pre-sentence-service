import { Request, Response } from 'express'
import BaseController from './baseController'

export default class OffenderAssessmentController extends BaseController {
  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/offender-assessment`, this.templateValues)
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect(`/${this.path}/risk-assessment`)
  }
}
