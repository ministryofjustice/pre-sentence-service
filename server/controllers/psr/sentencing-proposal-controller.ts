import BaseController from './baseController'
import * as z from 'zod'
import { longText } from '../../utils/validation'

const sentencingProposalModel = z
  .object({
    proposedSentence: longText({
      label: 'Proposed sentence',
      requiredMessage: 'Enter the proposed sentence',
    }),
    proposedSentenceRationale: longText({
      label: 'Rationale for the proposed sentence',
      requiredMessage: 'Explain your rationale for the proposed sentence',
    }),
    alternativeSentencingOptions: longText({
      label: 'Alternative sentencing options',
      requiredMessage: 'Outline alternative sentencing options',
    }),
    custodialSentenceConsideration: z.preprocess(
      val => val ?? '',
      z.string().min(1, 'Select the button that best describes the possibility of a custodial sentence if relevant')
    ),
    custodialSentenceImpact: longText({ label: 'Impact of a custodial sentence' }).optional(),
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

export default class SentencingProposalController extends BaseController {
  override templatePath = 'sentencing-proposal'

  override redirectPath = 'sources-of-information'

  override pageFields = pageFields

  override model = sentencingProposalModel
}
