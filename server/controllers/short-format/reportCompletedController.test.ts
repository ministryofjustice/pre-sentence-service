import { Request, Response } from 'express'

import ReportCompletedController from './reportCompletedController'
import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'
import { validateUUID } from '../../utils/reportValidation'

jest.mock('../../services/reportService')
jest.mock('../../services/communityService')
jest.mock('../../utils/reportValidation')

describe('Route Handlers - Report Completed Controller', () => {
  const validateUUIDMock = validateUUID as jest.MockedFunction<(uuid: string) => boolean>
  let mockedReportService: ReportService
  let mockedCommunityService: CommunityService
  let handler: ReportCompletedController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    mockedCommunityService = new CommunityService(null)
    handler = new ReportCompletedController(mockedReportService, mockedCommunityService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {
        reportType: 'short-format',
      },
      session: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
    } as unknown as Response
    validateUUIDMock.mockReturnValue(true)
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(validateUUIDMock).toHaveBeenCalled()
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        data: {
          ...handler.defaultTemplateData,
        },
      })
    })
  })
})
