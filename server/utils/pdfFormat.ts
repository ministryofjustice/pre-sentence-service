import ReportDetails from '../repositories/entities/reportDetails'

export const pdfOptions = {
  marginTop: '0.8',
  marginBottom: '0.7',
  marginLeft: '0.9',
  marginRight: '0.9',
}

interface FooterData {
  version: number | string
}

const footerDivStyle = 'display:flex; justify-content:flex-end; width:100%;'
const headerFooterStyle =
  'font-family: Arial; font-size: 10px; width: 100%; height: 15px; padding: 10px; display: flex; align-items: center;'

export function getHeader(): string {
  return `
    <span id="qa-official" style="${headerFooterStyle}">
      <span style="margin: 0 auto;">OFFICIAL</span>
    </span>
  `
}

export function getDraftHeader(): string {
  return `
    <span id="qa-official" style="${headerFooterStyle}">
      <span style="margin: 0 auto;">DRAFT VERSION - NOT FOR OFFICIAL USE</span>
    </span>
  `
}

export function getDraftFooter(): string {
  return `
    <span id="qa-official-footer" style="${headerFooterStyle}">
    <span style="flex: 1; text-align: center;"></span>
      <span>DRAFT VERSION - NOT FOR OFFICIAL USE</span>

    <span style="flex: 1; text-align: right">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </span>

    </span>
  `
}

export function getFooter(data: FooterData): string {
  return `
    <span id="qa-official-footer" style="${headerFooterStyle}">
        <div style="${footerDivStyle}">
            <span style="text-align: right">Version: ${data.version} - Page <span class="pageNumber"></span> of <span class="totalPages"></span></stan>
        </div>
    </span>
  `
}

export function configureReportData(report: ReportDetails) {
  const reportData: { [key: string]: unknown } = {
    reportStatus: report.status,
    reportType: report.reportType,
    reportVersion: report.version || 1,
  }

  // Extract data from pages structure
  if (report.pages) {
    report.pages.forEach(page => {
      page.questions.forEach(question => {
        reportData[question.value] = question.answer
      })
    })
  }

  // Add person details if available
  if (report.person) {
    reportData.crn = report.person.crn
    reportData.name = `${report.person.names.foreName} ${report.person.names.surname}`
    reportData.dateOfBirth = report.person.dateOfBirth
    reportData.address = report.person.address
  }

  return reportData
}
