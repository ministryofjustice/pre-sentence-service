import BaseController from './baseController'
import * as z from 'zod'

export const pageFields: Array<string> = [
  'pnc',
  'offencesUnderConsideration',
  'offencesPattern',
  'proposedSentence',
  'proposedSentenceRationale',
  'alternativeSentencingOptions',
  'custodialSentenceConsideration',
  'custodialSentenceImpact',
]

const sentencingProposalModel = z
  .object({
    proposedSentence: z.string().min(1, 'Enter the proposed sentence'),
    proposedSentenceRationale: z.string().min(1, 'Explain your rationale for the proposed sentence'),
    alternativeSentencingOptions: z.string().min(1, 'Outline alternative sentencing options'),
    custodialSentenceConsideration: z
      .string()
      .min(1, 'Select the button that best describes the possibility of a custodial sentence if relevant'),
    custodialSentenceImpact: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Conditional validation: if "possible" is selected, text editor is mandatory
    if (data.custodialSentenceConsideration === 'possible') {
      if (!data.custodialSentenceImpact || data.custodialSentenceImpact.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'Explain the impact of a custodial sentence',
          path: ['custodialSentenceImpact'],
        })
      }
    }
  })

export default class SentencingProposalController extends BaseController {
  override templatePath = 'sentencing-proposal'

  override redirectPath = 'sources-of-information'

  override pageFields = pageFields

  override model = sentencingProposalModel
}
