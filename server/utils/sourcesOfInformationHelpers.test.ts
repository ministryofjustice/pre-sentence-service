import {
  buildPdfSourcesOfInformation,
  buildSourcesOfInformation,
  SourceOfInformation,
} from './sourcesOfInformationHelpers'

describe('buildSourcesOfInformation', () => {
  const sources: SourceOfInformation[] = [
    {
      key: 'cps_summary',
      value: 'CPS summary',
      isCustom: false,
    },
    {
      key: 'interview',
      value: 'Interview',
      isCustom: false,
    },
  ]

  it('checks sources selected from submitted checkbox values', () => {
    expect(buildSourcesOfInformation(sources, ['cps_summary'])).toEqual([
      expect.objectContaining({
        key: 'cps_summary',
        checked: true,
      }),
      expect.objectContaining({
        key: 'interview',
        checked: false,
      }),
    ])
  })

  it('checks sources selected from a single persisted source value', () => {
    expect(buildSourcesOfInformation(sources, 'cps_summary')).toEqual([
      expect.objectContaining({
        key: 'cps_summary',
        checked: true,
      }),
      expect.objectContaining({
        key: 'interview',
        checked: false,
      }),
    ])
  })

  it('checks sources selected from comma-separated persisted source values', () => {
    expect(buildSourcesOfInformation(sources, 'cps_summary,interview')).toEqual([
      expect.objectContaining({
        key: 'cps_summary',
        checked: true,
      }),
      expect.objectContaining({
        key: 'interview',
        checked: true,
      }),
    ])
  })

  it('does not check sources when no selected sources are provided', () => {
    expect(buildSourcesOfInformation(sources)).toEqual([
      expect.objectContaining({
        key: 'cps_summary',
        checked: false,
      }),
      expect.objectContaining({
        key: 'interview',
        checked: false,
      }),
    ])
  })
})

describe('buildPdfSourcesOfInformation', () => {
  const sources: SourceOfInformation[] = [
    { key: 'victim_statement', value: 'Victim statement', isCustom: false },
    { key: 'cps_summary', value: 'CPS summary', isCustom: false },
    { key: 'interview', value: 'Interview', isCustom: false },
    { key: 'dwp', value: 'DWP', isCustom: true },
  ]

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
