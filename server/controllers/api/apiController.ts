import { Request, Response } from 'express'
import ReportService, { IFieldValue } from '../../services/reportService'
import EventService from '../../services/eventService'
import config from '../../config'
import CommunityService from '../../services/communityService'
import ReportDefinition from '../../repositories/entities/reportDefinition'
import Report from '../../repositories/entities/report'
import { convertToTitleCase, getIsoDate } from '../../utils/utils'
import { configureReportData, getFooter, getHeader, pdfOptions } from '../../utils/pdfFormat'
import type { Offence, OffenceInformation } from '../../@types/offence'
import type { Address, Offender } from '../../@types/offender'

export default class ApiController {
  constructor(
    protected readonly reportService: ReportService = null,
    protected readonly eventService: EventService,
    protected readonly communityService: CommunityService
  ) {}

  // Support legacy nDelius report types
  private correctReportType(reportType: string): string {
    let correctedReportType: string
    switch (reportType) {
      case 'shortFormatPreSentenceReport':
        correctedReportType = 'short-format'
        break
      case 'oralReport':
        correctedReportType = 'record-of-oral'
        break
      default:
        correctedReportType = ''
    }
    return correctedReportType.length ? correctedReportType : reportType
  }

  private configureFieldValue(
    report: Report,
    reportDefinition: ReportDefinition,
    fieldName: string,
    value: string
  ): IFieldValue {
    const definitionField = reportDefinition.fields.filter(field => field.name === fieldName)
    return {
      reportId: report.id,
      fieldId: definitionField[0].id,
      value,
      version: 1,
    }
  }

  private async getOffenderInformationFields(
    report: Report,
    reportDefinition: ReportDefinition,
    crn: string
  ): Promise<Array<IFieldValue>> {
    const offenderInformation: Offender = await this.communityService.getAllOffenderInformation(crn)
    const fieldValues: Array<IFieldValue> = []
    fieldValues.push(
      this.configureFieldValue(
        report,
        reportDefinition,
        'name',
        `${convertToTitleCase(offenderInformation.firstName)} ${convertToTitleCase(offenderInformation.surname)}`
      )
    )
    fieldValues.push(
      this.configureFieldValue(report, reportDefinition, 'dateOfBirth', getIsoDate(offenderInformation.dateOfBirth))
    )
    if (offenderInformation.otherIds && offenderInformation.otherIds.pncNumber) {
      fieldValues.push(
        this.configureFieldValue(report, reportDefinition, 'pnc', offenderInformation.otherIds.pncNumber.toUpperCase())
      )
    }
    if (
      offenderInformation.contactDetails &&
      offenderInformation.contactDetails.addresses &&
      offenderInformation.contactDetails.addresses.length
    ) {
      const address: Address = offenderInformation.contactDetails.addresses[0]
      let configuredAddress
      if (address.noFixedAbode) {
        configuredAddress = 'No fixed abode'
      } else {
        configuredAddress = `${address.buildingName ? convertToTitleCase(address.buildingName) : ''} ${
          address.addressNumber ? address.addressNumber : ''
        } ${address.streetName ? convertToTitleCase(address.streetName) : ''} ${
          address.district ? convertToTitleCase(address.district) : ''
        } ${address.town ? convertToTitleCase(address.town) : ''} ${
          address.county ? convertToTitleCase(address.county) : ''
        } ${address.postcode ? address.postcode.toUpperCase() : ''}`
      }
      fieldValues.push(this.configureFieldValue(report, reportDefinition, 'address', configuredAddress))
    }
    return fieldValues
  }

  protected async getAdditionalInformationFields(
    report: Report,
    reportDefinition: ReportDefinition,
    crn: string,
    eventId: string
  ): Promise<Array<IFieldValue>> {
    const convictions: Array<OffenceInformation> = await this.communityService.getOffenceInformation(crn)
    const offenceInformation = convictions.find(conviction => conviction.index === eventId)
    const mainOffences = offenceInformation.offences.filter((offence: Offence) => offence.mainOffence)
    const mainOffenceData: Array<string> = []
    mainOffences.forEach((offence: Offence) => {
      mainOffenceData.push(offence.detail.description)
    })
    const otherOffenceData: Array<string> = []
    const otherOffences = offenceInformation.offences.filter((offence: Offence) => !offence.mainOffence)
    otherOffences.forEach((offence: Offence) => {
      otherOffenceData.push(offence.detail.description)
    })
    const fieldValues: Array<IFieldValue> = []
    fieldValues.push(this.configureFieldValue(report, reportDefinition, 'mainOffence', mainOffenceData.join('/n')))
    if (otherOffenceData.length) {
      fieldValues.push(this.configureFieldValue(report, reportDefinition, 'otherOffences', otherOffenceData.join('/n')))
    }
    fieldValues.push(
      this.configureFieldValue(report, reportDefinition, 'court', offenceInformation.responsibleCourt.courtName)
    )
    fieldValues.push(
      this.configureFieldValue(
        report,
        reportDefinition,
        'localJusticeArea',
        offenceInformation.responsibleCourt.probationArea.description
      )
    )
    return fieldValues
  }

  createReport = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const reportDefinition = await this.reportService.getDefinitionByType(reportType)
      if (!reportDefinition) {
        res.status(400).end()
        return
      }
      const report = await this.reportService.createReport({
        ...req.body,
        entityId: req.body.eventNumber.toString(),
        reportDefinitionId: reportDefinition.id,
      })
      const offenderInformationFields = await this.getOffenderInformationFields(report, reportDefinition, req.body.crn)
      const additionalInformationFields = await this.getAdditionalInformationFields(
        report,
        reportDefinition,
        req.body.crn,
        req.body.eventNumber.toString()
      )
      const fieldValues: Array<IFieldValue> = [
        this.configureFieldValue(report, reportDefinition, 'crn', req.body.crn.toUpperCase()),
      ]
        .concat(offenderInformationFields)
        .concat(additionalInformationFields)

      await this.reportService.updateFieldValues(fieldValues)
      await this.eventService.sendReportEvent({
        reportId: report.id,
        entityId: req.body.eventNumber.toString(),
        crn: req.body.crn.toUpperCase(),
        reportStatus: 'started',
      })
      res.status(201).json({
        ...report,
        urn: `uk:gov:hmpps:pre-sentence-service:report:${report.id}`,
      })
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }

  getReportById = async (req: Request, res: Response): Promise<void> => {
    try {
      const report = await this.reportService.getReportById(req.params.id)
      res.json(report)
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }

  getPdfById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const report = await this.reportService.getReportById(id)
      const reportData = configureReportData(report)
      const headerHtml = getHeader()
      const footerHtml = getFooter({ version: reportData.reportVersion })
      // Specify preSentenceUrl so that it is used in the NJK template as http://host.docker.internal:3000/assets
      const { preSentenceUrl } = config.apis.gotenberg
      const filename = `${reportData.reportType}_${id}.pdf`
      res.renderPDF(
        `reports/${reportData.reportType}`,
        { preSentenceUrl, data: reportData },
        { filename, pdfOptions: { ...pdfOptions, headerHtml, footerHtml } }
      )
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }

  getAllReportsByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const reportType = this.correctReportType(req.params.reportType)
      const results = await this.reportService.getAllReportsByType(reportType)
      res.json({
        request: req.params.reportType,
        found: results && results.length,
        results,
      })
    } catch (error) {
      res.status(error.status || 500).send(error.message)
    }
  }
}
