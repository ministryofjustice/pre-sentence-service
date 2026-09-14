import { buildPdfSourcesOfInformation, SourceOfInformation } from './sourcesOfInformationHelpers'

const sources: SourceOfInformation[] = [
  { key: 'victim_statement', value: 'Victim statement', isCustom: false },
  { key: 'cps_summary', value: 'CPS summary', isCustom: false },
  { key: 'interview', value: 'Interview', isCustom: false },
  { key: 'dwp', value: 'DWP', isCustom: true },
]

describe('buildPdfSourcesOfInformation', () => {
  it('splits sources into predefined and custom lists', () => {
    const result = buildPdfSourcesOfInformation(sources, '')
    expect(result.predefined.map(s => s.label)).toEqual(['CPS summary', 'Interview', 'Victim statement'])
    expect(result.custom.map(s => s.label)).toEqual(['DWP'])
  })

  it('marks selected sources as used and unselected as not used', () => {
    const result = buildPdfSourcesOfInformation(sources, 'cps_summary,dwp')
    expect(result.predefined).toEqual([
      { label: 'CPS summary', used: true },
      { label: 'Interview', used: false },
      { label: 'Victim statement', used: false },
    ])
    expect(result.custom).toEqual([{ label: 'DWP', used: true }])
  })

  it('marks all sources as not used when no selection has been saved', () => {
    const result = buildPdfSourcesOfInformation(sources, undefined)
    expect(result.predefined.every(s => !s.used)).toBe(true)
    expect(result.custom.every(s => !s.used)).toBe(true)
  })

  it('sorts labels alphabetically ignoring case', () => {
    const unsorted: SourceOfInformation[] = [
      { key: 'service_records', value: 'Service records', isCustom: false },
      { key: 'oasys_assessments', value: 'OASys assessments', isCustom: false },
      { key: 'sentencing_guidelines', value: 'Sentencing guidelines', isCustom: false },
    ]
    const result = buildPdfSourcesOfInformation(unsorted, '')
    expect(result.predefined.map(s => s.label)).toEqual([
      'OASys assessments',
      'Sentencing guidelines',
      'Service records',
    ])
  })

  it('returns an empty custom list when the report has no custom sources', () => {
    const result = buildPdfSourcesOfInformation(
      sources.filter(s => !s.isCustom),
      'interview'
    )
    expect(result.custom).toEqual([])
  })
})
