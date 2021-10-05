import { Request, Response } from 'express'
import { getFooter, getHeader, pdfOptions } from '../../utils/pdfFormat'
import logger from '../../../logger'
import config from '../../config'

// @TODO: Replace temp dummy data when data integrated
export const tempData = {
  version: '1.0',
  reportStatus: 'DRAFT',
  name: 'Lenore Marquez',
  dateOfBirth: '18/08/1979',
  age: 42,
  crn: 'DX12340A',
  address: 'Some address, somewhere.',
  pnc: 'A/987930B',
}

export default class PdfRoutes {
  preview = async (req: Request, res: Response): Promise<void> => {
    const { id, reportType } = req.params
    const report = tempData
    const headerHtml = getHeader()
    const footerHtml = getFooter(report)
    logger.info(`Request to preview ${reportType} report ${id}`)
    res.render(`reports/${reportType}`, { data: report, headerHtml, footerHtml })
  }

  renderPdf = async (req: Request, res: Response): Promise<void> => {
    const { id, reportType } = req.params
    const report = tempData
    logger.info(`Request to print PDF for ${reportType} report ${id}`)
    const filename = `${reportType}_${id}.pdf`
    const headerHtml = getHeader()
    const footerHtml = getFooter(report)
    // Specify preSentenceUrl so that it is used in the NJK template as http://host.docker.internal:3000/assets
    const { preSentenceUrl } = config.apis.gotenberg
    res.renderPDF(
      `reports/${reportType}`,
      { preSentenceUrl, data: report },
      { filename, pdfOptions: { ...pdfOptions, headerHtml, footerHtml } }
    )
  }
}
