import * as z from 'zod'

export const normalizeSourcesToArray = (val: unknown): string[] => {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return [val]
  return []
}

export const sourcesOfInformationModel = z.object({
  sourcesOfInformation: z.preprocess(
    normalizeSourcesToArray,
    z.array(z.string()).min(1, 'You must select all sources used to inform this report')
  ),
})

export const isSourcesOfInformationComplete = (data: Record<string, unknown>): boolean => {
  const raw = data.sourcesOfInformation
  const normalized = typeof raw === 'string' ? raw.split(',').filter(s => s.trim() !== '') : raw
  return sourcesOfInformationModel.safeParse({ sourcesOfInformation: normalized }).success
}
