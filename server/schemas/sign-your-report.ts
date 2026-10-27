import * as z from 'zod'

export const signYourReportModel = z.object({
  signReportName: z.string().min(1, 'You must sign your report before you submit'),
})

const issuesFor = (data: Record<string, unknown>): string[] => {
  const result = signYourReportModel.safeParse({
    signReportName: (data.signReportName as string | undefined) ?? '',
  })
  if (result.success) return []
  return result.error.issues.map(i => String(i.path[0])).filter(Boolean)
}

export const isSignedByComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('signReportName')
