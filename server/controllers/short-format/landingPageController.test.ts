import { Request, Response } from 'express'

import LandingPageController from './landingPageController'
import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'
import validateUUID from '../../utils/reportValidation'

jest.mock('../../services/reportService')
jest.mock('../../services/communityService')
jest.mock('../../utils/reportValidation')

describe('Route Handlers - Short Format Pre-Sentence Report Landing Page Controller', () => {
  let mockedReportService: ReportService
  let mockedCommunityService: CommunityService
  let handler: LandingPageController
  let req: Request
  let res: Response

  const validateUUIDMock = validateUUID as jest.MockedFunction<(uuid: string) => boolean>

  beforeAll(() => {
    mockedReportService = new ReportService()
    mockedCommunityService = new CommunityService(null)
    handler = new LandingPageController(mockedReportService, mockedCommunityService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {},
      session: {},
    } as Request
    res = {
      render: jest.fn(),
    } as unknown as Response
    validateUUIDMock.mockReturnValue(true)
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
