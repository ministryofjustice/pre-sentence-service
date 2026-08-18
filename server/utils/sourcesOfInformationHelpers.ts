export interface SourceOfInformation {
  key: string
  value: string
  isCustom: boolean
  checked?: boolean
}

export const buildSourcesOfInformation = (
  sourcesOfInformation: SourceOfInformation[],
  selectedSources?: string
): SourceOfInformation[] => {
  const selected = new Set<string>(selectedSources ? selectedSources.split(',') : [])

  return sourcesOfInformation.map(source => ({
    ...source,
    checked: selected.has(source.key),
  }))
}

export type SourceOfInformationActions = 'add-source'

export const isSourceAction = (v: unknown): v is SourceOfInformationActions => v === 'add-source'
