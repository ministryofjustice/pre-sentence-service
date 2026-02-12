import { getConnection } from 'typeorm'
import ReportDetails, { ReportStatus } from '../repositories/entities/reportDetails'

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
  origin: string
  pages?: IReportPage[]
  reportType: string
  createdBy: string
  isDeleted?: boolean
  version?: number
}

export default class ReportDetailsService {
  public async createReportDetails(reportData: IReportDetails): Promise<ReportDetails> {
    const reportRepository = getConnection().getRepository(ReportDetails)
    const report = reportRepository.create({
      ...reportData,
      status: reportData.status || ReportStatus.NOT_STARTED,
      createdAt: new Date(),
      lastUpdatedBy: new Date(),
      isDeleted: false,
      version: 1,
    })
    return reportRepository.save(report)
  }

  public async getReportDetailsById(id: string): Promise<ReportDetails | null> {
    return getConnection()
      .getRepository(ReportDetails)
      .findOne({
        where: {
          id,
          isDeleted: false,
        },
        relations: ['person'],
      })
  }

  public async getReportDetailsByPersonId(personId: number): Promise<ReportDetails[]> {
    return getConnection()
      .getRepository(ReportDetails)
      .find({
        where: {
          personId,
          isDeleted: false,
        },
        relations: ['person'],
      })
  }

  public async getReportDetailsByType(reportType: string): Promise<ReportDetails[]> {
    return getConnection()
      .getRepository(ReportDetails)
      .find({
        where: {
          reportType,
          isDeleted: false,
        },
        relations: ['person'],
      })
  }

  public async updateReportDetails(id: string, reportData: Partial<IReportDetails>): Promise<ReportDetails | null> {
    const reportRepository = getConnection().getRepository(ReportDetails)
    const report = await reportRepository.findOne({
      where: { id, isDeleted: false },
    })

    if (!report) {
      return null
    }

    const updated = reportRepository.merge(report, {
      ...reportData,
      lastUpdatedBy: new Date(),
      version: (report.version || 1) + 1,
    })

    return reportRepository.save(updated)
  }

  public async updateReportStatus(id: string, status: ReportStatus): Promise<ReportDetails | null> {
    return this.updateReportDetails(id, { status })
  }

  public async updateReportPages(id: string, pages: IReportPage[]): Promise<ReportDetails | null> {
    return this.updateReportDetails(id, { pages })
  }

  public async getPageData(id: string, pageName: string): Promise<IReportPage | null> {
    const report = await this.getReportDetailsById(id)
    if (!report || !report.pages) {
      return null
    }

    return report.pages.find(page => page.name === pageName) || null
  }

  public async updatePageData(id: string, pageName: string, pageData: IReportPage): Promise<ReportDetails | null> {
    const report = await this.getReportDetailsById(id)
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
    const reportRepository = getConnection().getRepository(ReportDetails)
    const report = await reportRepository.findOne({ where: { id } })

    if (!report) {
      return false
    }

    await reportRepository.update(id, {
      isDeleted: true,
      lastUpdatedBy: new Date(),
    })

    return true
  }
}
