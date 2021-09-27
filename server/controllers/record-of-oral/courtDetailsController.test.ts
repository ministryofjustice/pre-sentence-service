import { Request, Response } from 'express'

import CourtDetailsController from './courtDetailsController'

describe('Route Handlers - Court Details Controller', () => {
  const handler = new CourtDetailsController()
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {} as Request
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
    } as unknown as Response
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/court-details`, {
        ...handler.templateValues,
        data: handler.tempDummyCourtData,
      })
    })
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/offence-details`)
    })
  })
})
