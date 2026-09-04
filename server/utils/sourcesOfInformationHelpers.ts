export interface SourceOfInformation {
  key: string
  value: string
  isCustom: boolean
  checked?: boolean
}

export const buildSourcesOfInformation = (
  sourcesOfInformation: SourceOfInformation[],
  selectedSources?: string | string[]
): SourceOfInformation[] => {
  const selectedValues = typeof selectedSources === 'string' ? selectedSources.split(',') : (selectedSources ?? [])

  const selected = new Set(selectedValues)

  return sourcesOfInformation.map(source => ({
    ...source,
    checked: selected.has(source.key),
  }))
}

export type SourceOfInformationActions = 'add-source'

export const isSourceAction = (v: unknown): v is SourceOfInformationActions => v === 'add-source'
