import { Request, Response } from 'express'
import BaseController from './baseController'

export default class CourtDetailsController extends BaseController {
  today = new Date()

  tempDummyCourtData = {
    court: "Sheffield Magistrate's Court",
    localJusticeArea: 'South Yorkshire',
    dateOfHearing: {
      day: this.today.getDate(),
      month: this.today.getMonth() + 1,
      year: this.today.getFullYear(),
    },
  }

  get = async (req: Request, res: Response): Promise<void> => {
    res.render('record-of-oral/court-details', {
      ...this.templateValues,
      data: this.tempDummyCourtData,
    })
  }

  post = async (req: Request, res: Response): Promise<void> => {
    res.redirect('/record-of-oral/offence-details')
  }
}
