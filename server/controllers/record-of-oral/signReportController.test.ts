import { Request, Response } from 'express'

import SignReportController from './signReportController'

describe('Route Handlers - Sign Report Controller', () => {
  const handler = new SignReportController()
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
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/sign-report`, {
        ...handler.templateValues,
        data: handler.tempDummySignReportData,
      })
    })
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/report-completed`)
    })
  })
})
