import { LONG_TEXT_MAX, longText } from './validation'

describe('longText', () => {
  const schema = longText({ label: 'Test field', requiredMessage: 'Test field is required' })

  it('rejects empty strings with the required message', () => {
    const result = schema.safeParse('')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Test field is required')
    }
  })

  it('accepts a non-empty string under the limit', () => {
    const result = schema.safeParse('hello')
    expect(result.success).toBe(true)
  })

  it('accepts a string exactly at the limit', () => {
    const result = schema.safeParse('a'.repeat(LONG_TEXT_MAX))
    expect(result.success).toBe(true)
  })

  it('rejects a string one character over the limit', () => {
    const result = schema.safeParse('a'.repeat(LONG_TEXT_MAX + 1))
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Test field must be 10,000 characters or fewer')
    }
  })

  it('exposes the limit constant', () => {
    expect(LONG_TEXT_MAX).toBe(20000)
  })

  describe('without a requiredMessage', () => {
    const optionalSchema = longText({ label: 'Optional field' })

    it('accepts an empty string', () => {
      expect(optionalSchema.safeParse('').success).toBe(true)
    })

    it('still rejects strings over the limit', () => {
      const result = optionalSchema.safeParse('a'.repeat(LONG_TEXT_MAX + 1))
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Optional field must be 10,000 characters or fewer')
      }
    })
  })

  describe('with a custom max', () => {
    const customMaxSchema = longText({ label: 'Custom field', max: 4000 })

    it('accepts a string exactly at the custom limit', () => {
      expect(customMaxSchema.safeParse('a'.repeat(4000)).success).toBe(true)
    })

    it('rejects a string one character over the custom limit', () => {
      const result = customMaxSchema.safeParse('a'.repeat(4001))
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Custom field must be 4,000 characters or fewer')
      }
    })
  })
})
