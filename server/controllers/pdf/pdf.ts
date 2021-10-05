import { Request, Response } from 'express'
import { getFooter, getHeader, pdfOptions } from '../../utils/pdfFormat'
import logger from '../../../logger'
import config from '../../config'

export default class PdfRoutes {
  private tempData = {
    version: '1.0',
    reportStatus: 'DRAFT',
    name: 'Lenore Marquez',
    dateOfBirth: '18/08/1979',
    age: 42,
    crn: 'DX12340A',
    address: 'Some address, somewhere.',
    pnc: 'A/987930B',
  }

  preview = async (req: Request, res: Response): Promise<void> => {
    const { username } = res.locals.user
    const { id, reportType } = req.params
    const report = this.tempData
    const headerHtml = getHeader()
    const footerHtml = getFooter(report)
    logger.info(`Request to preview ${reportType} report ${id} from user ${username}`)
    res.render(`reports/${reportType}`, { licence: report, headerHtml, footerHtml })
  }

  renderPdf = async (req: Request, res: Response): Promise<void> => {
    const { username } = res.locals.user
    const { id, reportType } = req.params
    const report = this.tempData
    logger.info(`Request to print PDF for ${reportType} ${id} from user ${username}`)
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
