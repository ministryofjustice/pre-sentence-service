import { Request, Response } from 'express'

import BaseController from './baseController'

describe('Route Handlers - Base Controller', () => {
  const handler = new BaseController()
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {} as Request
    res = {} as Response
  })

  describe('values', () => {
    it('should declare path as string', async () => {
      expect(typeof handler.path).toEqual('string')
      expect(handler.path.length).toBeGreaterThan(0)
    })

    it('should declare default templateValues', async () => {
      expect(typeof handler.templateValues).toBe('object')
      expect(typeof handler.templateValues.preSentenceType).toEqual('string')
      expect(handler.templateValues.preSentenceType.length).toBeGreaterThan(0)
    })
  })

  describe('GET', () => {
    it('method declaration for override - should return null', async () => {
      const response = await handler.get(req, res)
      expect(response).toBeNull()
    })
  })

  describe('POST', () => {
    it('method declaration for override - should return null', async () => {
      const response = await handler.get(req, res)
      expect(response).toBeNull()
    })
  })
})
