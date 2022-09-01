import { RequestHandler } from 'express'
import { UserAccess } from '../@types/userAccess'
import asyncMiddleware from './asyncMiddleware'
import CommunityService from '../services/communityService'
import ReportService from '../services/reportService'
import FieldValue from '../repositories/entities/fieldValue'
import Report from '../repositories/entities/report'
import logger from '../../logger'

export default function restrictionExclusionMiddleware(
  reportService: ReportService,
  communityService: CommunityService
): RequestHandler {
  return asyncMiddleware(async (req, res, next) => {
    if (req.session && req.session.isAllowedAccess) {
      logger.info('\n\nUSER ACCESS FROM SESSION\n\n')
      return next()
    }
    const report: Report = await reportService.getReportById(req.params.reportId)
    if (report && report.fieldValues) {
      logger.info('\n\nTRY TEST USER ACCESS\n\n')
      const crnField: FieldValue = report.fieldValues.find(fieldValue => fieldValue.field.name === 'crn')
      try {
        const userAccess: UserAccess = await communityService.getUserAccess(crnField.value, res.locals.user.username)
        logger.info('\n\nTEST USER ACCESS RETURNED:', userAccess, '\n\n')
        if (userAccess) {
          req.session.isAllowedAccess = true
          return next()
        }
      } catch (error) {
        let disallowedMessage: string
        let disallowedStack: string
        if (error.data && error.data.userExcluded) {
          disallowedMessage = 'User Excluded'
          disallowedStack = error.data.exclusionMessage
        } else if (error.data && error.data.userRestricted) {
          disallowedMessage = 'User Restricted'
          disallowedStack = error.data.restrictionMessage
        } else {
          disallowedMessage = 'Error'
          disallowedStack = 'Unable to check restriction / exclusion'
        }
        res.render('pages/error', {
          message: disallowedMessage,
          stack: disallowedStack,
          status: error.status,
        })
      }
    }
    logger.info('\n\nTEST USER ACCESS FAILED MASSIVELY')
    return null
  })
}
