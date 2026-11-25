import BaseController from './baseController'
import { Request, Response } from 'express'
import { validateForm } from '../../utils/formValidation'
import { areReviewSectionsComplete, getReportProgress } from '../../utils/reportProgress'
import EventService from '../../services/eventService'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { transformDefendantDetails } from '../../utils/apiDataTransformers'
import logger from '../../../logger'
import config from '../../config'
import { signYourReportModel } from '../../schemas/sign-your-report'
import { classifyError, LogEvent } from '../../utils/logging'
import { ensureError } from '../../utils/errorHandling'
import { HttpError } from '../../@types/httpError'

export { signYourReportModel } from '../../schemas/sign-your-report'

export const pageFields: Array<string> = ['signReportName', 'professionalStatus']

export default class SignYourReportController extends BaseController {
  override templatePath = 'sign-your-report'

  override redirectPath = 'publish-report'

  override model = signYourReportModel

  override pageFields = pageFields

  private eventService?: EventService

  constructor(
    reportService: ReportService,
    preSentenceToDeliusService?: PreSentenceToDeliusService,
    eventService?: EventService
  ) {
    super(reportService, preSentenceToDeliusService)
    this.eventService = eventService
  }

  private getSavedAnswers = () => {
    const data: Record<string, unknown> = {}

    this.report.pages?.forEach(page => {
      page.questions.forEach(question => {
        data[question.value] = question.answer
      })
    })

    return data
  }

  private fetchApiDefendantData = async (reportId: string): Promise<Record<string, unknown>> => {
    if (!this.preSentenceToDeliusService) {
      return { crn: this.report.person.crn, apiDefendantDetailsAvailable: false }
    }
    try {
      const apiData = await this.preSentenceToDeliusService.getDefendantDetails(reportId)
      return { ...transformDefendantDetails(apiData), apiDefendantDetailsAvailable: true }
    } catch (error) {
      const err = ensureError(error)
      const errorType = classifyError(err)

      logger.warn(
        {
          reportId,
          errorName: err.name,
          errorType,
        },
        'Failed to fetch defendant details from Pre-Sentence to Delius API'
      )

      return { crn: this.report.person.crn, apiDefendantDetailsAvailable: false }
    }
  }

  private loadSigningHistory = async (reportId: string): Promise<void> => {
    if (!config.features.unlockedSigning) {
      return
    }

    const previouslySigned = await this.reportService.hasReportBeenSigned(reportId)
    this.data = {
      ...this.data,
      previouslySigned,
    }
  }

  protected override async beforeRender(req: Request<{ reportId: string }>, _res: Response): Promise<void> {
    await this.loadSigningHistory(req.params.reportId)
  }

  override post = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => {
    const reportId = req.params.reportId
    const username = (res.locals?.user?.username as string | undefined) || 'system'
    const redirectPath = req.query?.redirectPath as string | undefined

    logger.info('Sign and lock report request initiated', {
      reportId,
      username,
      hasRedirectPath: !!redirectPath,
    })

    if (redirectPath) {
      logger.info('Delegating to super.post due to redirectPath', { reportId })
      await super.post(req, res)
      return
    }

    logger.info('Fetching report for signing', { reportId })
    const rep = await this.reportService.getReportById(reportId)

    if (!rep) {
      logger.warn('Report not found for signing', { reportId })
      res.redirect(`/${this.path}/${reportId}/not-found`)
      return
    }

    logger.info('Report retrieved successfully', {
      reportId,
      reportStatus: rep.status,
      hasPerson: !!rep.person,
      crn: rep.person?.crn,
    })

    this.report = rep

    await this.loadSigningHistory(reportId)

    const validatedForm = validateForm(req.body, this.model)
    if (!validatedForm.isValid) {
      logger.warn('Form validation failed for sign and lock', {
        reportId,
        errors: validatedForm.errors,
      })
      await super.post(req, res)
      return
    }

    logger.info('Form validation successful', {
      reportId,
      signReportName: req.body.signReportName,
      professionalStatus: req.body.professionalStatus,
    })

    logger.info('Building report data for progress check', { reportId })
    const apiDefendantData = await this.fetchApiDefendantData(reportId)
    const data = {
      ...this.defaultTemplateData,
      ...this.getSavedAnswers(),
      ...this.report,
      ...apiDefendantData,
      ...req.body,
      ...(config.features.unlockedSigning ? { previouslySigned: this.data.previouslySigned } : {}),
    }

    // Fetch sources of information to determine if all sections are complete before signing and locking
    const sourcesOfInformation = await this.reportService.getSourcesOfInformation(reportId)
    const sectionStatuses = getReportProgress(data, sourcesOfInformation)

    logger.info('Report progress calculated', {
      reportId,
      sectionStatuses,
      allSectionsComplete: areReviewSectionsComplete(sectionStatuses),
    })

    if (!areReviewSectionsComplete(sectionStatuses)) {
      logger.warn('Report sections incomplete, cannot sign and lock', {
        reportId,
        sectionStatuses,
      })
      this.renderTemplate(res, {
        ...this.templateValues,
        reportId,
        data: {
          ...data,
          reviewProgressBlocked: true,
          sectionStatuses,
        },
        formValidation: {
          isValid: false,
          errors: {
            reviewProgress: config.features.unlockedSigning
              ? 'Complete all sections in Review your progress before signing this report'
              : 'Complete all sections in Review your progress before signing and locking this report',
          },
        },
      })
      return
    }

    logger.info('All report sections complete, proceeding to sign and lock', { reportId })

    logger.info('Updating report actions (signing and locking)', { reportId })
    try {
      await this.updateReportActions(req, username)
      logger.info('Report actions updated successfully', { reportId })
    } catch (e) {
      const error = e as HttpError
      const errorType = classifyError(error)

      logger.error(
        {
          event: LogEvent.RequestFailed,
          page: 'sign-your-report',
          reportId,
          statusCode: error.status || 500,
          errorType,
          err: error,
        },
        'Failed to update report actions'
      )

      throw error
    }

    if (!this.eventService) {
      logger.error('Domain event service not available, cannot submit report', { reportId })
      this.renderSubmissionFailure(res, reportId, data)
      return
    }

    try {
      await this.reportService.submitReport(reportId, this.eventService, {
        eventNumber: this.report.id!,
        crn: this.report.person.crn,
        reportStatus: 'created',
        username,
        pdfUrl: `${config.domain}/api/v1/report/${this.report.id}/pdf`,
      })
    } catch (error) {
      const err = ensureError(error)

      logger.error(
        {
          event: LogEvent.RequestFailed,
          page: 'sign-your-report',
          reportId,
          errorType: classifyError(err as HttpError),
          err,
        },
        'Failed to submit report after retries, rolled back submittedAt'
      )

      this.renderSubmissionFailure(res, reportId, data)
      return
    }

    logger.info('Redirecting to publish report page', {
      reportId,
      redirectPath: this.redirectPath,
    })
    res.redirect(`/${this.path}/${reportId}/${this.redirectPath}`)
  }

  private renderSubmissionFailure = (res: Response, reportId: string, data: Record<string, unknown>): void => {
    this.renderTemplate(res, {
      ...this.templateValues,
      reportId,
      data,
      formValidation: {
        isValid: false,
        errors: {
          submission:
            "We couldn't submit your report right now. Please wait a moment and try again. If this keeps happening, contact support.",
        },
      },
    })
  }
}
