import { getRepository } from 'typeorm'
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
  id?: number
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
    const reportRepository = getRepository(ReportDetails)
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

  public async getReportDetailsById(id: number): Promise<ReportDetails | null> {
    return getRepository(ReportDetails).findOne({
      where: {
        id,
        isDeleted: false,
      },
      relations: ['person'],
    })
  }

  public async getReportDetailsByPersonId(personId: number): Promise<ReportDetails[]> {
    return getRepository(ReportDetails).find({
      where: {
        personId,
        isDeleted: false,
      },
      relations: ['person'],
    })
  }

  public async getReportDetailsByType(reportType: string): Promise<ReportDetails[]> {
    return getRepository(ReportDetails).find({
      where: {
        reportType,
        isDeleted: false,
      },
      relations: ['person'],
    })
  }

  public async updateReportDetails(id: number, reportData: Partial<IReportDetails>): Promise<ReportDetails | null> {
    const reportRepository = getRepository(ReportDetails)
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

  public async updateReportStatus(id: number, status: ReportStatus): Promise<ReportDetails | null> {
    return this.updateReportDetails(id, { status })
  }

  public async updateReportPages(id: number, pages: IReportPage[]): Promise<ReportDetails | null> {
    return this.updateReportDetails(id, { pages })
  }

  public async getPageData(id: number, pageName: string): Promise<IReportPage | null> {
    const report = await this.getReportDetailsById(id)
    if (!report || !report.pages) {
      return null
    }

    return report.pages.find(page => page.name === pageName) || null
  }

  public async updatePageData(id: number, pageName: string, pageData: IReportPage): Promise<ReportDetails | null> {
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

  public async deleteReportDetails(id: number): Promise<boolean> {
    const reportRepository = getRepository(ReportDetails)
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
