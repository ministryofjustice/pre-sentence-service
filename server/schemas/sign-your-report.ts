import * as z from 'zod'

export const signYourReportModel = z
  .object({
    signReportName: z.string().min(1, 'You must sign your report before you submit'),
    isDangerousReport: z.preprocess(
      val => val ?? '',
      z.string().min(1, 'Specify whether this is a dangerousness report')
    ),
    spoName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isDangerousReport === 'yes' && !data.spoName?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['spoName'],
        message: 'Enter the name of the SPO who reviewed the report',
      })
    }
  })

const issuesFor = (data: Record<string, unknown>): string[] => {
  const result = signYourReportModel.safeParse({
    signReportName: (data.signReportName as string | undefined) ?? '',
    isDangerousReport: (data.isDangerousReport as string | undefined) ?? '',
    spoName: data.spoName as string | undefined,
  })
  if (result.success) return []
  return result.error.issues.map(i => String(i.path[0])).filter(Boolean)
}

export const isSignedByComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('signReportName')

export const isDangerousnessReportComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('isDangerousReport')

export const isSpoNameComplete = (data: Record<string, unknown>): boolean => !issuesFor(data).includes('spoName')
