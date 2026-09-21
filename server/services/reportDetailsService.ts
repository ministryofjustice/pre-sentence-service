import ReportDetails, { ReportStatus } from '../repositories/entities/reportDetails'
import ReportDetailsRepository from '../repositories/reportDetailsRepository'

export interface IReportPage {
  name: string
  questions: Array<{
    id: number
    value: string
    answer: string
  }>
}

export interface IReportDetails {
  id?: string
  personId: number
  status?: ReportStatus
  origin?: string
  pages?: IReportPage[]
  reportType?: string
  createdBy: string
  isDeleted?: boolean
  version?: number
  submittedAt?: Date | null
}

export default class ReportDetailsService {
  constructor(private readonly reportDetailsRepository = new ReportDetailsRepository()) {}

  public async createReportDetails(reportData: IReportDetails): Promise<ReportDetails> {
    const report = this.reportDetailsRepository.create({
      ...reportData,
      status: reportData.status || ReportStatus.NOT_STARTED,
      origin: reportData.origin || '',
      reportType: reportData.reportType || 'psr',
      createdAt: new Date(),
      lastUpdatedBy: new Date(),
      isDeleted: false,
      version: 1,
    })
    return this.reportDetailsRepository.save(report)
  }

  public async getReportDetailsById(id: string): Promise<ReportDetails | null> {
    return this.reportDetailsRepository.findById(id)
  }

  public async getReportDetailsByType(reportType: string): Promise<ReportDetails[]> {
    return this.reportDetailsRepository.findByType(reportType)
  }

  public async getAllReportsPaginated(
    page: number = 1,
    limit: number = 20
  ): Promise<{ reports: ReportDetails[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit
    const [reports, total] = await this.reportDetailsRepository.findAndCountPaginated(skip, limit)

    return {
      reports,
      total,
      totalPages: Math.ceil(total / limit),
    }
  }

  public async updateReportDetails(id: string, reportData: Partial<IReportDetails>): Promise<ReportDetails | null> {
    const report = await this.reportDetailsRepository.findById(id)

    if (!report) {
      return null
    }

    const updated = this.reportDetailsRepository.merge(report, {
      ...reportData,
      lastUpdatedBy: new Date(),
      version: (report.version || 1) + 1,
    })

    return this.reportDetailsRepository.save(updated)
  }

  public async updateReportStatus(id: string, status: ReportStatus): Promise<ReportDetails | null> {
    return this.updateReportDetails(id, { status })
  }

  public async updateReportPages(id: string, pages: IReportPage[]): Promise<ReportDetails | null> {
    return this.updateReportDetails(id, { pages })
  }

  public async getPageData(id: string, pageName: string): Promise<IReportPage | null> {
    const report = await this.reportDetailsRepository.findById(id)

    if (!report || !report.pages) {
      return null
    }

    return report.pages.find(page => page.name === pageName) || null
  }

  public async updatePageData(id: string, pageName: string, pageData: IReportPage): Promise<ReportDetails | null> {
    const report = await this.reportDetailsRepository.findById(id)
    if (!report) {
      return null
    }

    const pages = report.pages || []
    const existingPageIndex = pages.findIndex(page => page.name === pageName)

    if (existingPageIndex >= 0) {
      pages[existingPageIndex] = pageData
    } else {
      pages.push(pageData)
    }

    return this.updateReportPages(id, pages)
  }

  public async deleteReportDetails(id: string): Promise<boolean> {
    const report = await this.reportDetailsRepository.findByIdIncludingDeleted(id)

    if (!report) {
      return false
    }

    await this.reportDetailsRepository.update(id, {
      isDeleted: true,
      lastUpdatedBy: new Date(),
    })

    return true
  }
}
