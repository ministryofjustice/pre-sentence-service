import { buildSourcesOfInformation, SourceOfInformation } from './sourcesOfInformationHelpers'

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