import BaseController from './baseController'
import * as z from 'zod'
import { Request } from 'express'

const offenceAnalysisModel = z
  .object({
    pnc: z.string().optional(),
    offencesUnderConsideration: z.string(),
    offencesPattern: z.string(),
    noPreviousOffences: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const offencesPatternEmpty = data.offencesPattern.trim() === ''
    const noPreviousOffences = data.noPreviousOffences ?? ''
    const noPreviousOffencesEmpty = noPreviousOffences.trim() === ''

    if (data.offencesUnderConsideration.trim() === '') {
      ctx.addIssue({
        code: 'custom',
        message: 'Analyse the offences under consideration',
        path: ['offencesUnderConsideration'],
      })
    }

    if (offencesPatternEmpty && noPreviousOffencesEmpty) {
      ctx.addIssue({
        code: 'custom',
        message: 'Analyse the pattern of offending and response to supervision',
        path: ['offencesPattern'],
      })

      ctx.addIssue({
        code: 'custom',
        message: 'Check the box if the defendant has no previous offences or experience of supervision',
        path: ['noPreviousOffences'],
      })
    }
  })

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern', 'noPreviousOffences']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'defendant-behaviour'

  override pageFields = pageFields

  override model = offenceAnalysisModel

  override correctFormData = (req: Request) => {
    // If noPreviousOffences checkbox is not in the form data, it means it's unchecked
    // Set it to empty string to clear the database value
    if (!req.body.noPreviousOffences) {
      return { noPreviousOffences: '' }
    }
    return {}
  }
}
