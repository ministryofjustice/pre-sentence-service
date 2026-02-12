import PersonDetailsService, { IPersonDetails } from './personDetailsService'
import ReportDetailsService, { IReportDetails, IReportPage } from './reportDetailsService'
import SourcesOfInformationService from './sourcesOfInformationService'
import { CustomSource, SourceKey, SourceOfInformation } from '../utils/sourcesOfInformationHelpers'
import ReportDetails, { ReportStatus } from '../repositories/entities/reportDetails'

export interface IReport {
  id?: string
  crn: string
  eventNumber: string
  reportType: string
  personDetails?: IPersonDetails
}

export interface IFieldValue {
  pageName: string
  questionId: number
  questionValue: string
  answer: string
}

export default class ReportService {
  private personDetailsService: PersonDetailsService
  private reportDetailsService: ReportDetailsService
  private sourcesOfInformationService: SourcesOfInformationService

  constructor() {
    this.personDetailsService = new PersonDetailsService()
    this.reportDetailsService = new ReportDetailsService()
    this.sourcesOfInformationService = new SourcesOfInformationService()
  }

  public async createReport(reportData: IReport, createdBy: string): Promise<ReportDetails> {
    // Check if person already exists
    let person = await this.personDetailsService.getPersonDetailsByCrn(reportData.crn)

    // Create person if doesn't exist
    if (!person && reportData.personDetails) {
      person = await this.personDetailsService.createPersonDetails({
        ...reportData.personDetails,
        crn: reportData.crn,
        createdBy,
      })
    }

    if (!person) {
      throw new Error('Person details are required to create a report')
    }

    // Create report
    const report = await this.reportDetailsService.createReportDetails({
      personId: person.id!,
      origin: reportData.eventNumber,
      reportType: reportData.reportType,
      createdBy,
    })

    return report
  }

  public async getReportById(id: string): Promise<ReportDetails | null> {
    return this.reportDetailsService.getReportDetailsById(id)
  }

  public async getSourcesOfInformation(reportId: string): Promise<SourceOfInformation[]> {
    return this.sourcesOfInformationService.getSourcesOfInformation(reportId)
  }

  public async saveCustomSourcesOfInformation(
    reportId: string,
    addedSources: CustomSource[],
    removedSources: SourceKey[],
    createdBy: string
  ): Promise<void> {
    return this.sourcesOfInformationService.saveCustomSourcesOfInformation(
      reportId,
      addedSources,
      removedSources,
      createdBy
    )
  }

  public async getAllReportsByType(type: string): Promise<ReportDetails[]> {
    return this.reportDetailsService.getReportDetailsByType(type)
  }

  public async updateReport(id: string, updates: Partial<IReportDetails>): Promise<ReportDetails | null> {
    return this.reportDetailsService.updateReportDetails(id, updates)
  }

  public async deleteReport(id: string): Promise<boolean> {
    return this.reportDetailsService.deleteReportDetails(id)
  }

  public async updateFieldValues(reportId: string, fieldValues: IFieldValue[]): Promise<ReportDetails | null> {
    const report = await this.reportDetailsService.getReportDetailsById(reportId)
    if (!report) {
      return null
    }

    const pages = report.pages || []

    // Group field values by page
    const pageMap = new Map<string, IReportPage>()

    for (const fieldValue of fieldValues) {
      if (!pageMap.has(fieldValue.pageName)) {
        const existingPage = pages.find(p => p.name === fieldValue.pageName)
        pageMap.set(fieldValue.pageName, existingPage || { name: fieldValue.pageName, questions: [] })
      }

      const page = pageMap.get(fieldValue.pageName)!
      const existingQuestionIndex = page.questions.findIndex(q => q.value === fieldValue.questionValue)

      if (existingQuestionIndex >= 0) {
        page.questions[existingQuestionIndex].answer = fieldValue.answer
      } else {
        page.questions.push({
          id: fieldValue.questionId,
          value: fieldValue.questionValue,
          answer: fieldValue.answer,
        })
      }
    }

    // Update pages
    for (const [pageName, pageData] of pageMap.entries()) {
      const existingPageIndex = pages.findIndex(p => p.name === pageName)
      if (existingPageIndex >= 0) {
        pages[existingPageIndex] = pageData
      } else {
        pages.push(pageData)
      }
    }

    return this.reportDetailsService.updateReportPages(reportId, pages)
  }

  public async getDefinitionByType(_type: string): Promise<{ id: number } | null> {
    // This is a compatibility method for the old structure
    // In the new structure, we don't have report definitions
    // We can return a mock object or refactor the calling code
    return { id: 1 }
  }

  public async updateReportStatus(reportId: string, status: ReportStatus): Promise<ReportDetails | null> {
    return this.reportDetailsService.updateReportStatus(reportId, status)
  }
}
