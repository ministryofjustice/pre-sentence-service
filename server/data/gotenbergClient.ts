import superagent from 'superagent'
import logger from '../../logger'

export type PdfOptions = {
  headerHtml?: string
  footerHtml?: string
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
}

export default class GotenbergClient {
  private gotenbergHost: string

  constructor(gotenbergHost: string) {
    this.gotenbergHost = gotenbergHost
  }

  async renderPdfFromHtml(html: string, options: PdfOptions = {}): Promise<Buffer> {
    const { headerHtml, footerHtml, marginBottom, marginLeft, marginRight, marginTop } = options
    try {
      const request = superagent
        .post(`${this.gotenbergHost}/forms/chromium/convert/html`)
        .set('Content-Type', 'multi-part/form-data')
        .buffer(true)
        .attach('files', Buffer.from(html), 'index.html')
        .responseType('blob')

      // Attach header and footer HTML blocks if specified
      if (headerHtml) request.attach('files', Buffer.from(headerHtml), 'header.html')
      if (footerHtml) request.attach('files', Buffer.from(footerHtml), 'footer.html')

      // Set paper size to A4. Page size and margins specified in inches
      request.field('paperWidth', 8.27)
      request.field('paperHeight', 11.7)
      if (marginTop) request.field('marginTop', marginTop)
      if (marginBottom) request.field('marginBottom', marginBottom)
      if (marginLeft) request.field('marginLeft', marginLeft)
      if (marginRight) request.field('marginRight', marginRight)

      // Execute the POST to the Gotenberg container
      const response = await request
      return response.body
    } catch (err) {
      logger.error(`Error POST to gotenberg:/forms/chromium/convert/html - {}`, err)
      return undefined
    }
  }
}
