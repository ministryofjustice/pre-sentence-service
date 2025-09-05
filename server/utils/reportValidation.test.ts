import validateUUID from './reportValidation'

describe('Report validation validateUUID', () => {
  it('should return true for a valid UUID', () => {
    expect(validateUUID('75A11367-7B74-4A43-B659-43C2AD2FAF82')).toBe(true)
    expect(validateUUID('75a11367-7b74-4a43-b659-43c2ad2faf82')).toBe(true)
  })

  it('should return false for invalid UUIDs', () => {
    expect(validateUUID('')).toBe(false)
    expect(validateUUID('foo')).toBe(false)
    expect(validateUUID('75a11367-7b74-4a43-b659-43c2ad2faf8')).toBe(false)
    expect(validateUUID('75a11367-7b74-4a43-b659-43c2ad2faf82-75a11367-7b74-4a43-b659-43c2ad2faf82')).toBe(false)
  })
})
