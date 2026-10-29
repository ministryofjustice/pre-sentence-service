import * as z from 'zod'
import { longText } from '../utils/validation'

export const offenceAnalysisModel = z
  .object({
    pnc: z.string().optional(),
    offencesUnderConsideration: longText({ label: 'Offences under consideration' }),
    offencesPattern: longText({ label: 'Pattern of offending' }),
  })
  .superRefine((data, ctx) => {
    const offencesPatternEmpty = data.offencesPattern.trim() === ''

    if (data.offencesUnderConsideration.trim() === '') {
      ctx.addIssue({
        code: 'custom',
        message: 'Analyse the offences under consideration',
        path: ['offencesUnderConsideration'],
      })
    }

    if (offencesPatternEmpty) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Analyse previous offending behaviour and response to supervision or briefly explain why this does not apply',
        path: ['offencesPattern'],
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

  const result = offenceAnalysisModel.safeParse({ offencesUnderConsideration, offencesPattern })
  if (result.success) return []
  return result.error.issues.map(i => String(i.path[0])).filter(Boolean)
}

export const isOffencesUnderConsiderationComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('offencesUnderConsideration')

export const isOffencesPatternComplete = (data: Record<string, unknown>): boolean => {
  const issues = issuesFor(data)
  return !issues.includes('offencesPattern')
}
