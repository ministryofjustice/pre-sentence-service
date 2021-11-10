import { Request, Response } from 'express'

import OffenderDetailsController from './offenderDetailsController'

describe('Route Handlers - Offender Details Controller', () => {
  const handler = new OffenderDetailsController()
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      body: {},
    } as Request
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
    } as unknown as Response
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        data: {
          ...handler.data,
        },
      })
    })
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/${handler.redirectPath}`)
    })
  })
})