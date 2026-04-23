import ReportDetails from '../repositories/entities/reportDetails'

export const pdfOptions = {
  marginTop: '1.65',
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
const pdfHeaderLogoStyle = 'height: 70px; width: auto; object-fit: contain;'
const headerRowStyle =
  'display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 50px; box-sizing: border-box;'




export function getHeader(armsB64: string, purpleB64: string): string {
  return `
    <div style="width: 100%; box-sizing: border-box;">
      <span id="qa-official" style="${headerFooterStyle}">
        <span style="margin: 0 auto;">OFFICIAL</span>
      </span>

      <div style="${headerRowStyle}">
        <img
          src="data:image/png;base64,${armsB64}"
          style="${pdfHeaderLogoStyle}"
        />

        <img
          src="data:image/png;base64,${purpleB64}"
          style="${pdfHeaderLogoStyle}"
        />
      </div>
    </div>
  `
}

export function getDraftHeader(armsB64: string, purpleB64: string): string {
  return `
    <div style="width: 100%; box-sizing: border-box;">
      <span id="qa-official" style="${headerFooterStyle}">
        <span style="margin: 0 auto;">DRAFT VERSION - NOT FOR OFFICIAL USE</span>
      </span>

      <div style="${headerRowStyle}">
        <img
          src="data:image/png;base64,${armsB64}"
          style="${pdfHeaderLogoStyle}"
        />

        <img
          src="data:image/png;base64,${purpleB64}"
          style="${pdfHeaderLogoStyle}"
        />
      </div>
    </div>
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
            <span style="text-align: right">Page <span class="pageNumber"></span> of <span class="totalPages"></span></stan>
        </div>
    </span>
  `
}

export function configureReportData(report: ReportDetails) {
  const reportData: { [key: string]: unknown } = {
    reportStatus: report.status,
    reportType: report.reportType,
    reportVersion: report.version || 1,
    reportOrigin: report.origin,
  }

  if (report.pages) {
    report.pages.forEach(page => {
      page.questions.forEach(question => {
        reportData[question.value] = question.answer
      })
    })
  }

  if (report.person) {
    reportData.crn = report.person.crn
  }

  return reportData
}
