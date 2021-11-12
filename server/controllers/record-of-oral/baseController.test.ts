import BaseController from './baseController'

describe('Route Handlers - Base Controller', () => {
  const handler = new BaseController()

  describe('values', () => {
    it('should declare path as string', async () => {
      expect(handler.path).toBe('record-of-oral')
    })

    it('should declare default templateValues', async () => {
      expect(handler.templateValues.reportPath).toBe('record-of-oral')
      expect(handler.templateValues.preSentenceType).toBe('Record of Oral Pre-Sentence Report')
    })
  })
})
