import BaseController from './baseController'
import * as z from 'zod'
import { Request } from 'express'

export const pageFields: Array<string> = ['sourcesOfInformation']

// Helper to normalize checkbox input to always be an array
const normalizeToArray = (val: unknown): string[] => {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return [val]
  return []
}

const sourcesOfInformationModel = z.object({
  sourcesOfInformation: z.preprocess(
    normalizeToArray,
    z.array(z.string()).min(1, 'You must select all sources used to inform this report')
  ),
})

export default class SourcesOfInformationController extends BaseController {
  override templatePath = 'sources-of-information'

  override redirectPath = 'preview-report'

  override model = sourcesOfInformationModel

  override pageFields = pageFields

  override correctFormData = (req: Request) => {
    // If sourcesOfInformation is not in form data, no checkboxes were selected
    // Set it to empty array to clear the database value
    if (!req.body.sourcesOfInformation) {
      return { sourcesOfInformation: [] }
    }
    return {}
  }
}
