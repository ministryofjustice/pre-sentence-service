import { isSourcesOfInformationComplete, sourcesOfInformationModel } from './sources-of-information'

describe('sourcesOfInformationModel', () => {
  it('rejects Save and continue when a source has not been added to the list', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'save-list',
      sourcesOfInformation: ['cps_summary'],
      source: 'A source that has not been added',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: 'custom',
            path: ['source'],
            message: 'Add this source to the list',
          }),
        ])
      )
    }
  })

  it('allows Add to list when a source has been entered', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: 'A new source',
    })

    expect(result.success).toBe(true)
  })

  it('allows Save and continue when the source field is blank', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'save-list',
      sourcesOfInformation: ['cps_summary'],
      source: '',
    })

    expect(result.success).toBe(true)
  })

  it('rejects "Save and continue" when no source is selected', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'save-list',
      sourcesOfInformation: [],
      source: '',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['sourcesOfInformation'],
            message: 'You must select all sources used to inform this report',
          }),
        ])
      )
    }
  })

  it('recognises saved sources when checking section completeness', () => {
    expect(
      isSourcesOfInformationComplete({
        sourcesOfInformation: 'cps_summary,interview',
      })
    ).toBe(true)
  })

  it('allows a source with exactly 80 characters', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: 'a'.repeat(80),
    })

    expect(result.success).toBe(true)
  })

  it('reports the correct number of excess characters', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: 'a'.repeat(85),
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['source'],
            message: 'You have 5 characters too many',
          }),
        ])
      )
    }
  })

  it('rejects adding a new source that is too long, when clicking "Add to list"', () => {
    const source = 'a'.repeat(81)

    const result = sourcesOfInformationModel.safeParse({
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source,
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['source'],
            message: 'You have 1 character too many',
          }),
        ])
      )
    }
  })

  it('rejects adding a new source that is too long, when clicking "Save and continue"', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'save-list',
      sourcesOfInformation: ['cps_summary'],
      source: 'a'.repeat(81),
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['source'],
            message: 'Source must be 80 characters or less',
          }),
        ])
      )
    }
  })

  it('rejects Add to list when the source is empty', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: '',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['source'],
            message: 'You cannot add a blank source to the list',
          }),
        ])
      )
    }
  })

  it('rejects Add to list when the source contains only whitespace', () => {
    const result = sourcesOfInformationModel.safeParse({
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: '   ',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['source'],
            message: 'You cannot add a blank source to the list',
          }),
        ])
      )
    }
  })
})
