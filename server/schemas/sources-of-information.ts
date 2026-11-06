import * as z from 'zod'
import { SourceOfInformation } from '../utils/sourcesOfInformationHelpers'

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
        message: 'You must select one or more sources used to inform this report',
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

export const isSourcesOfInformationComplete = (
  data: Record<string, unknown>,
  sourcesOfInformation: SourceOfInformation[]
): boolean => {
  const raw = data.sourcesOfInformation
  const selectedSourceKeys = typeof raw === 'string' ? raw.split(',').filter(key => key.trim() !== '') : raw

  // Only consider default (non-custom) sources when determining section completeness
  const selectedDefaultSourceKeys = normalizeSourcesToArray(selectedSourceKeys).filter(selectedKey =>
    sourcesOfInformation.some(source => source.key === selectedKey && !source.isCustom)
  )

  return sourcesOfInformationModel.safeParse({
    sourcesOfInformation: selectedDefaultSourceKeys,
  }).success
}
