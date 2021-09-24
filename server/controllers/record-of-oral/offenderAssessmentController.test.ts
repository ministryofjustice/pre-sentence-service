import { Request, Response } from 'express'

import OffenderAssessmentController from './offenderAssessmentController'

describe('Route Handlers - Offender Assessment Controller', () => {
  const handler = new OffenderAssessmentController()
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
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/offender-assessment`, handler.templateValues)
    })
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/risk-assessment`)
    })
  })
})
