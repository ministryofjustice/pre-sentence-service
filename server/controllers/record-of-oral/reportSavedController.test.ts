import { Request, Response } from 'express'

import ReportSavedController from './reportSavedController'

describe('Route Handlers - Report Saved Controller', () => {
  const handler = new ReportSavedController()
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
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/report-saved`, handler.templateValues)
    })
  })
})
