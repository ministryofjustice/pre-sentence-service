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

export interface PdfSourceOfInformation {
  label: string
  used: boolean
}

export interface PdfSourcesOfInformation {
  predefined: PdfSourceOfInformation[]
  custom: PdfSourceOfInformation[]
}

export const buildPdfSourcesOfInformation = (
  sources: SourceOfInformation[],
  selectedSources?: string
): PdfSourcesOfInformation => {
  const resolved = buildSourcesOfInformation(sources, selectedSources).sort((a, b) =>
    a.value.localeCompare(b.value, undefined, { sensitivity: 'base' })
  )
  const toPdf = (s: SourceOfInformation): PdfSourceOfInformation => ({ label: s.value, used: !!s.checked })
  return {
    predefined: resolved.filter(s => !s.isCustom).map(toPdf),
    custom: resolved.filter(s => s.isCustom).map(toPdf),
  }
}

export type SourceOfInformationActions = 'add-source'

export const isSourceAction = (v: unknown): v is SourceOfInformationActions => v === 'add-source'
