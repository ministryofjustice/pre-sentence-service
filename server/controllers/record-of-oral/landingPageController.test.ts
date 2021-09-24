import { Request, Response } from 'express'

import LandingPageController from './landingPageController'

describe('Route Handlers - Landing Page Controller', () => {
  const handler = new LandingPageController()
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {} as Request
    res = {
      render: jest.fn(),
    } as unknown as Response
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/landing`, {
        ...handler.templateValues,
        timestamp: '',
      })
    })
  })
})
