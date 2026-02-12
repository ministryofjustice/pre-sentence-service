import nunjucks from 'nunjucks'
import express from 'express'
import * as pathModule from 'path'

const production = process.env.NODE_ENV === 'production'

export default function nunjucksSetup(app: express.Express, path: pathModule.PlatformPath): void {
  app.set('view engine', 'njk')

  app.locals.asset_path = '/assets/'
  app.locals.applicationName = 'Pre-sentence Service'
  app.locals.headerTitle = 'Write a pre-sentence report'

  // Cachebusting version string
  if (production) {
    // Version only changes on reboot
    app.locals.version = Date.now().toString()
  } else {
    // Version changes every request
    app.use((req, res, next) => {
      res.locals.version = Date.now().toString()
      return next()
    })
  }

  const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../../server/views'),
      'node_modules/govuk-frontend/dist',
      'node_modules/govuk-frontend/dist/govuk/components/',
      'node_modules/@ministryofjustice/frontend/',
      'node_modules/@ministryofjustice/frontend/moj/components/',
      'node_modules/nhsuk-frontend/packages/components',
      'node_modules/nhsuk-frontend/packages/macros',
    ],
    {
      autoescape: true,
      express: app,
    }
  )

  njkEnv.addFilter('initialiseName', (fullName: string) => {
    // this check is for the authError page
    if (!fullName) {
      return null
    }
    const array = fullName.split(' ')
    return `${array[0][0]}. ${array.reverse()[0]}`
  })

  njkEnv.addFilter('zero', (n: string | number) => {
    return `0${n}`.slice(-2)
  })

  njkEnv.addFilter('formatDate', date => {
    if (!date) return ''

    let dateObj: Date

    // Handle Date objects, ISO strings, and DD/MM/YYYY strings
    if (date instanceof Date) {
      dateObj = date
    } else if (typeof date === 'string') {
      // Check if it's already in DD/MM/YYYY format
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        return date
      }
      // Otherwise parse as ISO or other format
      dateObj = new Date(date)
    } else {
      return ''
    }

    // Format as DD/MM/YYYY
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const year = dateObj.getFullYear()

    return `${day}/${month}/${year}`
  })

  njkEnv.addFilter('calculateAge', dob => {
    if (!dob) return ''

    let birthDate: Date

    // Handle both Date objects and DD/MM/YYYY strings
    if (dob instanceof Date) {
      birthDate = dob
    } else if (typeof dob === 'string') {
      // Parse DD/MM/YYYY format
      const [day, month, year] = dob.split('/').map(Number)
      birthDate = new Date(year, month - 1, day)
    } else {
      return ''
    }

    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  })
}
