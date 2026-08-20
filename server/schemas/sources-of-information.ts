import * as z from 'zod'

export const normalizeSourcesToArray = (val: unknown): string[] => {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return [val]
  return []
}

export const sourcesOfInformationModel = z
  .object({
    action: z.string().optional(),

    sourcesOfInformation: z.preprocess(normalizeSourcesToArray, z.array(z.string()).optional()),

    source: z.string().optional(),
  })
  .superRefine((data, context) => {
    const selectedSources = data.sourcesOfInformation ?? []

    if (data.action !== 'add-source' && selectedSources.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['sourcesOfInformation'],
        message: 'You must select all sources used to inform this report',
      })
    }

    if (data.action === 'add-source' && !data.source?.trim()) {
      context.addIssue({
        code: 'custom',
        path: ['source'],
        message: 'You cannot add a blank source to the list',
      })

      return
    }

    if (data.action === 'save-list' && data.source?.trim()) {
      context.addIssue({
        code: 'custom',
        path: ['source'],
        message: 'Add this source to the list',
      })

      return
    }

    if (data.source && data.source.length > 80) {
      context.addIssue({
        code: 'custom',
        path: ['source'],
        message: 'Source must be 80 characters or less',
      })

      return
    }

    // Duplicate source validation is handled in SourcesOfInformationController.validateAction,
    // so it can reuse the existing report-specific duplicate check in ReportService.
  })

export const isSourcesOfInformationComplete = (data: Record<string, unknown>): boolean => {
  const raw = data.sourcesOfInformation
  const normalized = typeof raw === 'string' ? raw.split(',').filter(s => s.trim() !== '') : raw

  return sourcesOfInformationModel.safeParse({
    sourcesOfInformation: normalized,
  }).success
}
