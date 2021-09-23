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
    res.render('record-of-oral/offender-details', {
      ...this.templateValues,
      data: this.tempDummyOffenderData,
    })
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect('/record-of-oral/court-details')
  }
}
