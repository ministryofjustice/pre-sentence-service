import { Request, Response } from 'express'

import ReportCompletedController from './reportCompletedController'

describe('Route Handlers - Report Completed Controller', () => {
  const handler = new ReportCompletedController()
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
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/report-saved`, {
        ...handler.templateValues,
        reportCompleted: true,
      })
    })
  })
})