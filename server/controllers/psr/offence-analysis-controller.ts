import BaseController from './baseController'
import { Request, Response } from 'express'
import * as z from 'zod'

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

  public async post(req: Request, res: Response): Promise<void> {
    const body = req.body as Record<string, any>

    if (!('noPreviousOffences' in body)) {
      body.noPreviousOffences = 'false'
    }

    await super.post(req, res)
  }
}
