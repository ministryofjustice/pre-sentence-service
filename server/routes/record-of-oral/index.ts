import { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'

export default function Index(): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(path, asyncMiddleware(handler))
  const templateValues = {
    preSentenceType: 'Record of Oral Pre-Sentence Report',
    timestamp: '', // @TODO: When integration with NDelius set timestamp as e.g. '1 hour ago'
  }

  get('/record-of-oral', (req, res, next) => {
    res.render('record-of-oral/landing', templateValues)
  })

  get('/record-of-oral/offender-details', (req, res, next) => {
    const tempDummyOffenderData = {
      // @TODO: Consume data when integrated with NDelius
      name: 'Lenore Marquez',
      dateOfBirth: '18/08/1979',
      age: 45,
      crn: 'DX12340A',
      address: '',
      pnc: '',
    }
    res.render('record-of-oral/offender-details', {
      ...templateValues,
      data: tempDummyOffenderData,
    })
  })
  post('/record-of-oral/offender-details', (req, res, next) => {
    res.redirect('/record-of-oral/court-details')
  })

  get('/record-of-oral/court-details', (req, res, next) => {
    const today = new Date()
    const tempDummyCourtData = {
      // @TODO: Consume data when integrated with NDelius
      court: "Sheffield Magistrate's Court",
      localJusticeArea: 'South Yorkshire',
      dateOfHearing: {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      },
    }

    res.render('record-of-oral/court-details', {
      ...templateValues,
      data: tempDummyCourtData,
    })
  })
  post('/record-of-oral/court-details', (req, res, next) => {
    res.redirect('/record-of-oral/offence-details')
  })

  get('/record-of-oral/offence-details', (req, res, next) => {
    res.render('record-of-oral/offence-details', templateValues)
  })
  post('/record-of-oral/offence-details', (req, res, next) => {
    res.redirect('/record-of-oral/offence-analysis')
  })

  get('/record-of-oral/offence-analysis', (req, res, next) => {
    res.render('record-of-oral/offence-analysis', templateValues)
  })
  post('/record-of-oral/offence-analysis', (req, res, next) => {
    res.redirect('/record-of-oral/offender-assessment')
  })

  get('/record-of-oral/offender-assessment', (req, res, next) => {
    res.render('record-of-oral/offender-assessment', templateValues)
  })
  post('/record-of-oral/offender-assessment', (req, res, next) => {
    res.redirect('/record-of-oral/risk-assessment')
  })

  get('/record-of-oral/risk-assessment', (req, res, next) => {
    res.render('record-of-oral/risk-assessment', templateValues)
  })
  post('/record-of-oral/risk-assessment', (req, res, next) => {
    res.redirect('/record-of-oral/proposal')
  })

  get('/record-of-oral/proposal', (req, res, next) => {
    res.render('record-of-oral/proposal', templateValues)
  })
  post('/record-of-oral/proposal', (req, res, next) => {
    res.redirect('/record-of-oral/sources-of-information')
  })

  get('/record-of-oral/sources-of-information', (req, res, next) => {
    res.render('record-of-oral/sources-of-information', templateValues)
  })
  post('/record-of-oral/sources-of-information', (req, res, next) => {
    res.redirect('/record-of-oral/check-report')
  })

  get('/record-of-oral/check-report', (req, res, next) => {
    res.render('record-of-oral/check-report', templateValues)
  })
  post('/record-of-oral/check-report', (req, res, next) => {
    res.redirect('/record-of-oral/sign-report')
  })

  get('/record-of-oral/sign-report', (req, res, next) => {
    const today = new Date()
    const tmpDummySignReportData = {
      // @TODO: Consume data when integrated with NDelius
      court: "Sheffield Magistrate's Court",
      localJusticeArea: 'South Yorkshire',
      completionDate: {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      },
    }
    res.render('record-of-oral/sign-report', {
      ...templateValues,
      data: tmpDummySignReportData,
    })
  })
  post('/record-of-oral/sign-report', (req, res, next) => {
    res.redirect('/record-of-oral/report-completed')
  })

  get('/record-of-oral/report-completed', (req, res, next) => {
    res.render('record-of-oral/report-saved', {
      ...templateValues,
      reportCompleted: true,
    })
  })

  get('/record-of-oral/report-saved', (req, res, next) => {
    res.render('record-of-oral/report-saved', templateValues)
  })

  return router
}
