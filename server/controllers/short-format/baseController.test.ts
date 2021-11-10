import BaseController from './baseController'

describe('Route Handlers - Base Controller', () => {
  const handler = new BaseController()

  describe('values', () => {
    it('should declare path as string', async () => {
      expect(handler.path).toBe('short-format')
    })

    it('should declare default templateValues', async () => {
      expect(handler.templateValues.reportPath).toBe('short-format')
      expect(handler.templateValues.preSentenceType).toBe('Short Format Pre-Sentence Report')
    })
  })
})
