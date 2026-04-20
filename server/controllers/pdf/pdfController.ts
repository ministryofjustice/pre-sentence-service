import { Request, Response } from 'express'
import {
  configureReportData,
  getDraftHeader,
  getDraftFooter,
  getFooter,
  getHeader,
  pdfOptions,
} from '../../utils/pdfFormat'
import logger from '../../../logger'
import config from '../../config'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import ReportService from '../../services/reportService'
import ReportDetails from '../../repositories/entities/reportDetails'
import path from 'path'
import fs from 'fs'

export default class PdfController {
  constructor(
    protected readonly reportService: ReportService,
    protected readonly preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {}

  renderPdf = async (req: Request, res: Response, draft: boolean): Promise<void> => {
    const { reportId } = req.params

    const report: ReportDetails | null = await this.reportService.getReportById(reportId)
    logger.info(`Request to print PDF for report ${reportId}`)

    if (report) {
      const reportData = configureReportData(report)
      const now = new Date()
      const dob = new Date(reportData.dateOfBirth as string)
      const birthdayThisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate())
      const ageOffset = now < birthdayThisYear ? 1 : 0
      const ageInYears = now.getFullYear() - dob.getFullYear() - ageOffset
      const riskToPublic: string = reportData.riskToPublic as string
      const riskToChildren: string = reportData.riskToChildren as string
      const riskToKnownAdults: string = reportData.riskToKnownAdults as string
      const riskToStaff: string = reportData.riskToStaff as string
      let impactExplanation: string = ''
      switch (reportData.custodialSentenceConsideration as string) {
        case 'possible':
          impactExplanation = 'A custodial sentence is possible or expected'
          break
        case 'not-threshold':
          impactExplanation =
            'A custodial sentence is not being considered as the offence does not meet the custodial threshold'
          break
        case 'court-indicated':
          impactExplanation = 'The court has indicated a custodial sentence is not being considered'
          break
      }

      let offenceData = {}

      try {
        if (this.preSentenceToDeliusService) {
          offenceData = await this.preSentenceToDeliusService.getOffences(reportId)
        }
      } catch (error) {
        logger.warn({ reportId, error }, 'Failed to fetch offence details from API')

        throw error
      }

      const pdfData = {
        ...reportData,
        riskToPublic: riskToPublic.replace('_', ' '),
        riskToChildren: riskToChildren.replace('_', ' '),
        riskToKnownAdults: riskToKnownAdults.replace('_', ' '),
        riskToStaff: riskToStaff.replace('_', ' '),
        ageInYears: ageInYears,
        impactExplanation: impactExplanation,
        offenceData: offenceData,
      }

      const headerHtml = draft ? getDraftHeader() : getHeader()
      const footerHtml = draft ? getDraftFooter() : getFooter({ version: reportData.reportVersion as string })

      // Specify preSentenceUrl so that it is used in the NJK template as http://host.docker.internal:3000/assets
      const { preSentenceUrl } = config.apis.gotenberg
      const filename = `${reportData.reportType}_${reportId}.pdf`

      const armsPath = path.join(__dirname, '../../views/assets/images/HMPPS_Lesser_Arms_Stacked_HEX.png')
      const purplePath = path.join(__dirname, '../../views/assets/images/ProbationPurple.png')
      const armsB64 = fs.readFileSync(armsPath).toString('base64')
      const purpleB64 = fs.readFileSync(purplePath).toString('base64')

      res.renderPDF(
        `reports/${reportData.reportType}`,
        { preSentenceUrl, data: pdfData, images: { armsB64, purpleB64 } },
        {
          filename,
          pdfOptions: {
            ...pdfOptions,
            printBackground: true,
            headerHtml,
            footerHtml,
            embeddedFiles: [
              { path: armsPath, as: 'arms.png' },
              { path: purplePath, as: 'purple.png' },
            ],
          },
        }
      )
    } else {
      res.redirect(`/${req.params.reportId}/not-found`)
    }
  }
}
