export const pdfOptions = {
  marginTop: '0.8',
  marginBottom: '0.7',
  marginLeft: '0.9',
  marginRight: '0.9',
}

interface FooterData {
  version: string
}

const footerDivStyle = 'width: 90%'
const pStyle = 'font-size: 8px; margin: 0; padding: 0'
const headerFooterStyle =
  'font-family: Arial; font-size: 10px; font-weight: bold; width: 100%; height: 15px; text-align: center; padding: 10px;'

export function getHeader(): string {
  return `
    <span style="${headerFooterStyle}">
      <span>OFFICIAL</span>
    </span>
  `
}

export function getFooter(data: FooterData): string {
  return `
    <span style="${headerFooterStyle}">
        <div style="${footerDivStyle}">
            <p style="${pStyle}">Version: ${data.version} - Page <span class="pageNumber"></span> of <span class="totalPages"></span></p>
        </div>
    </span>
  `
}
