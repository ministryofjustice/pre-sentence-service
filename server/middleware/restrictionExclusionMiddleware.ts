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
    if (req.session?.isAllowedAccess) {
      return next()
    }
    logger.info(`Parameters: ${req.params}`)
    logger.info(`Get report with id: ${req.params.reportId}`)
    const report: Report = await reportService.getReportById(req.params.reportId)
    if (report?.fieldValues) {
      logger.info('Report', report)
      const crnField: FieldValue = report.fieldValues.find(fieldValue => fieldValue.field.name === 'crn')
      logger.info('CRN Field', crnField)
      try {
        const userAccess: UserAccess = await communityService.getUserAccess(crnField.value, res.locals.user.username)
        if (userAccess) {
          req.session.isAllowedAccess = true
          return next()
        }
      } catch (error) {
        let disallowedMessage: string
        let disallowedStack: string
        if (error.data?.userExcluded) {
          disallowedMessage = 'User Excluded'
          disallowedStack = error.data.exclusionMessage
        } else if (error.data?.userRestricted) {
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
    return null
  })
}
