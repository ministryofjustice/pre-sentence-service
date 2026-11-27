import { editOffencesModel } from './edit-offences'

describe('editOffencesModel', () => {
  it('rejects an empty main offence description', () => {
    const result = editOffencesModel.safeParse({
      mainOffenceDescription: '',
      mainOffenceDate: '2024-04-12',
      mainOffenceCode: '03001',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: 'custom',
            path: ['mainOffenceDescription'],
            message: 'You must include a Main Offence',
          }),
        ])
      )
    }
  })

  it('rejects a whitespace-only main offence description', () => {
    const result = editOffencesModel.safeParse({
      mainOffenceDescription: '   ',
      mainOffenceDate: '2024-04-12',
      mainOffenceCode: '03001',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: 'custom',
            path: ['mainOffenceDescription'],
            message: 'You must include a Main Offence',
          }),
        ])
      )
    }
  })

  it('accepts a non-empty main offence description', () => {
    const result = editOffencesModel.safeParse({
      mainOffenceDescription: 'Criminal damage to property',
      mainOffenceDate: '2024-04-12',
      mainOffenceCode: '03001',
    })

    expect(result.success).toBe(true)
  })
})
