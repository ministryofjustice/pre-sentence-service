import { Request, Response } from 'express'

import OffenceAnalysisController from './offenceAnalysisController'

describe('Route Handlers - Offence Analysis Controller', () => {
  const handler = new OffenceAnalysisController()
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
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/offence-analysis`, handler.templateValues)
    })
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/offender-assessment`)
    })
  })
})
