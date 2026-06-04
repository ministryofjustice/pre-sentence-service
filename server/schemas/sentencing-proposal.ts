import * as z from 'zod'
import { PROPOSED_SENTENCE_MAX, longText } from '../utils/validation'

export const sentencingProposalModel = z
  .object({
    proposedSentence: longText({
      label: 'Proposed sentence',
      requiredMessage: 'Enter the proposed sentence',
      max: PROPOSED_SENTENCE_MAX,
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

const issuesFor = (data: Record<string, unknown>): string[] => {
  const result = sentencingProposalModel.safeParse({
    proposedSentence: (data.proposedSentence as string | undefined) ?? '',
    proposedSentenceRationale:
      (data.proposedSentenceRationale as string | undefined) ??
      (data.rationaleForProposedSentence as string | undefined) ??
      '',
    alternativeSentencingOptions: (data.alternativeSentencingOptions as string | undefined) ?? '',
    custodialSentenceConsideration: (data.custodialSentenceConsideration as string | undefined) ?? '',
    custodialSentenceImpact: data.custodialSentenceImpact as string | undefined,
  })
  if (result.success) return []
  return result.error.issues.map(i => String(i.path[0])).filter(Boolean)
}

export const isProposedSentenceComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('proposedSentence')

export const isProposedSentenceRationaleComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('proposedSentenceRationale')

export const isAlternativeSentencingOptionsComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('alternativeSentencingOptions')

export const isSentenceImpactComplete = (data: Record<string, unknown>): boolean => {
  const issues = issuesFor(data)
  return !issues.includes('custodialSentenceConsideration') && !issues.includes('custodialSentenceImpact')
}
