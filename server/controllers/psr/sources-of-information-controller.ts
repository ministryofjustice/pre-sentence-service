import BaseController from './baseController'
import { Request } from 'express'
import { sourcesOfInformationModel } from '../../schemas/sources-of-information'

export const pageFields: Array<string> = ['sourcesOfInformation']

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'preview-report'

  override model = sourcesOfInformationModel

  override pageFields = pageFields

  override correctFormData = (req: Request) => {
    if (!req.body.sourcesOfInformation) {
      return { sourcesOfInformation: [] }
    }
    return {}
  }

  // Override the validateAction method to check for duplicate sources
  protected override async validateAction(
    req: Request<{ reportId: string }>
  ): Promise<Record<string, string> | undefined> {
    if (req.body.action !== 'add-source') {
      return undefined
    }

    const source = typeof req.body.source === 'string' ? req.body.source.trim() : ''
    if (!source) return undefined

    const sourceExists = await this.reportService.sourceExistsForReport(req.params.reportId, source)
    if (sourceExists) {
      return { source: 'This source already exists' }
    }
    return undefined
  }
}
