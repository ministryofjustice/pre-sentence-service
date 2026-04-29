import { Response } from 'express'
import path from 'path'
import fs from 'fs'
import logger from '../../logger'
import config from '../config'
import ReportDetails from '../repositories/entities/reportDetails'
import PreSentenceToDeliusService from './preSentenceToDeliusService'
import type { Address, DefendantDetails } from '../@types/preSentenceToDelius'
import {
  configureReportData,
  getDraftHeader,
  getDraftFooter,
  getFooter,
  getHeader,
  pdfOptions,
} from '../utils/pdfFormat'

export interface PdfGenerationOptions {
  draft?: boolean
}

interface PdfAddress {
  buildingName: string
  addressNumber: string
  streetName: string
  town: string
  district: string
  county: string
  postcode: string
}

function buildPdfAddress(apiAddress?: Address): PdfAddress {
  return {
    buildingName: apiAddress?.buildingName ?? '',
    addressNumber: apiAddress?.buildingNumber ?? '',
    streetName: apiAddress?.streetName ?? '',
    town: apiAddress?.town ?? '',
    district: apiAddress?.district ?? '',
    county: apiAddress?.county ?? '',
    postcode: apiAddress?.postcode ?? '',
  }
}

function fullName(defendant: DefendantDetails): string {
  return [defendant.name.forename, defendant.name.middleName, defendant.name.surname].filter(Boolean).join(' ')
}

function capitalise(str: string): string {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}

export default class PdfGenerationService {
  constructor(private readonly preSentenceToDeliusService?: PreSentenceToDeliusService) {}

  async generatePdf(report: ReportDetails, res: Response, options: PdfGenerationOptions = {}): Promise<void> {
    const { draft = false } = options
    const reportId = report.id

    logger.info(`Request to print PDF for report ${reportId}`)

    if (!this.preSentenceToDeliusService) {
      throw new Error('Pre-Sentence to Delius service is required to generate a PDF')
    }

    const reportData = configureReportData(report)

    const defendant = await this.preSentenceToDeliusService.getDefendantDetails(reportId)
    const offenceData = await this.preSentenceToDeliusService.getOffences(reportId)

    const dob = new Date(defendant.dateOfBirth)
    const now = new Date()
    const birthdayThisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate())
    const ageOffset = now < birthdayThisYear ? 1 : 0
    const ageInYears = now.getFullYear() - dob.getFullYear() - ageOffset

    const riskToPublic: string = reportData.riskToPublic as string
    const riskToChildren: string = reportData.riskToChildren as string
    const riskToKnownAdults: string = reportData.riskToKnownAdults as string
    const riskToStaff: string = reportData.riskToStaff as string
    let impactExplanation = ''
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

    const pdfData = {
      ...reportData,
      name: fullName(defendant),
      dateOfBirth: dob,
      address: buildPdfAddress(defendant.mainAddress),
      riskToPublic: capitalise(riskToPublic.replace('_', ' ')),
      riskToChildren: capitalise(riskToChildren.replace('_', ' ')),
      riskToKnownAdults: capitalise(riskToKnownAdults.replace('_', ' ')),
      riskToStaff: capitalise(riskToStaff.replace('_', ' ')),
      ageInYears,
      impactExplanation,
      offenceData,
    }

    const { preSentenceUrl } = config.apis.gotenberg
    const filename = `${reportData.reportType}_${reportId}.pdf`

    const armsPath = path.join(__dirname, '../views/assets/images/HMPPS_Lesser_Arms_Stacked_HEX.png')
    const purplePath = path.join(__dirname, '../views/assets/images/ProbationPurple.png')
    const armsB64 = fs.readFileSync(armsPath).toString('base64')
    const purpleB64 = fs.readFileSync(purplePath).toString('base64')

    const headerHtml = draft ? getDraftHeader(armsB64, purpleB64) : getHeader(armsB64, purpleB64)
    const footerHtml = draft ? getDraftFooter() : getFooter()

    res.renderPDF(
      'reports/psr',
      { preSentenceUrl, data: pdfData },
      {
        filename,
        pdfOptions: {
          ...pdfOptions,
          printBackground: true,
          headerHtml,
          footerHtml,
        },
      }
    )
  }
}
