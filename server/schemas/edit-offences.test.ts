import { editOffencesModel } from './edit-offences'

describe('editOffencesModel', () => {
  it('accepts a main offence with optional additional offences', () => {
    const result = editOffencesModel.safeParse({
      mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
      additionalOffences: 'Driving after consuming alcohol or taking drugs - 08/09/2026',
    })
    expect(result.success).toBe(true)
  })

  it('accepts a missing additionalOffences field', () => {
    const result = editOffencesModel.safeParse({ mainOffence: 'Theft from a shop - 01/01/2026' })
    expect(result.success).toBe(true)
  })

  it.each(['', '   ', undefined])('rejects main offence %p', value => {
    const result = editOffencesModel.safeParse({ mainOffence: value, additionalOffences: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('You must include a main offence')
      expect(result.error.issues[0].path).toEqual(['mainOffence'])
    }
  })
})
