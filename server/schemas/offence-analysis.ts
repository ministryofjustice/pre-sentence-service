import * as z from 'zod'
import { longText } from '../utils/validation'

export const offenceAnalysisModel = z
  .object({
    pnc: z.string().optional(),
    offencesUnderConsideration: longText({ label: 'Offences under consideration' }),
    offencesPattern: longText({ label: 'Pattern of offending' }),
    noPreviousOffences: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const offencesPatternEmpty = data.offencesPattern.trim() === ''
    const noPreviousOffences = data.noPreviousOffences ?? ''
    const noPreviousOffencesEmpty = noPreviousOffences.trim() === '' || noPreviousOffences.trim() === 'false'

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

const issuesFor = (data: Record<string, unknown>): string[] => {
  const offencesUnderConsideration =
    (data.offencesUnderConsideration as string | undefined) ??
    (data.offenceUnderConsideration as string | undefined) ??
    ''
  const offencesPattern =
    (data.offencesPattern as string | undefined) ?? (data.offencePattern as string | undefined) ?? ''
  const noPreviousOffences = (data.noPreviousOffences as string | undefined) ?? ''

  const result = offenceAnalysisModel.safeParse({ offencesUnderConsideration, offencesPattern, noPreviousOffences })
  if (result.success) return []
  return result.error.issues.map(i => String(i.path[0])).filter(Boolean)
}

export const isOffencesUnderConsiderationComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('offencesUnderConsideration')

export const isOffencesPatternComplete = (data: Record<string, unknown>): boolean => {
  const issues = issuesFor(data)
  return !issues.includes('offencesPattern') && !issues.includes('noPreviousOffences')
}
