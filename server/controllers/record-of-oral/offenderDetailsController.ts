import { Request, Response } from 'express'
import BaseController from './baseController'

export default class OffenderDetailsController extends BaseController {
  tempDummyOffenderData = {
    name: 'Lenore Marquez',
    dateOfBirth: '18/08/1979',
    age: 42,
    crn: 'DX12340A',
    address: '',
    pnc: '',
  }

  get = async (req: Request, res: Response): Promise<void> => {
    res.render(`${this.path}/offender-details`, {
      ...this.templateValues,
      data: this.tempDummyOffenderData,
    })
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect(`/${this.path}/court-details`)
  }
}
