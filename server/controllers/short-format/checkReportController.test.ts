import { Request, Response } from 'express'

import CheckReportController from './checkReportController'

describe('Route Handlers - Check Report Controller', () => {
  const handler = new CheckReportController()
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      params: {},
    } as Request
    res = {
      render: jest.fn(),
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
})
