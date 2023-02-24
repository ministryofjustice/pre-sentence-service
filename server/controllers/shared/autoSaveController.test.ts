import { Request, Response } from 'express'

import ReportService from '../../services/reportService'
import AutoSaveController from './autoSaveController'

jest.mock('../../services/reportService')

describe('Route Handlers - Auto Save Controller', () => {
  let mockedReportService: ReportService
  let handler: AutoSaveController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    handler = new AutoSaveController(mockedReportService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {
        reportId: '12345678',
      },
      body: [
        {
          id: 'name',
          value: 'Some name',
        },
      ],
      session: {},
    } as unknown as Request
    res = {
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response
  })

  describe('POST', () => {
    it('should redirect to the correct view', async () => {
      await handler.post(req, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalled()
    })

    it('should send http 409 status when field validations fail', async () => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const fieldValueVersionsSpy = jest.spyOn(handler as any, 'checkFieldValueVersions')
      fieldValueVersionsSpy.mockReturnValueOnce(false)
      await handler.post(req, res)
      expect(res.status).toHaveBeenCalledWith(409)
      expect(fieldValueVersionsSpy).toHaveBeenCalledWith(req)
      expect(res.send).toHaveBeenCalled()
    })
  })
})
