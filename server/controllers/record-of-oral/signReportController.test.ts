import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

import SignReportController from './signReportController'
import ReportService from '../../services/reportService'
import CommunityService from '../../services/communityService'
import EventService from '../../services/eventService'
import validateUUID from '../../utils/reportValidation'

jest.mock('../../services/reportService')
jest.mock('../../services/communityService')
jest.mock('../../services/eventService')
jest.mock('../../utils/formValidation')
jest.mock('../../utils/reportValidation')

describe('Route Handlers - Sign Report Controller', () => {
  const validateFormMock = validateForm as jest.MockedFunction<
    (formData: FormData, formValidation: FormValidation) => ValidatedForm
  >
  const validateUUIDMock = validateUUID as jest.MockedFunction<(uuid: string) => boolean>
  let mockedReportService: ReportService
  let mockedEventService: EventService
  let mockedCommunityService: CommunityService
  let handler: SignReportController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    mockedCommunityService = new CommunityService(null)
    mockedEventService = new EventService()
    handler = new SignReportController(mockedReportService, mockedCommunityService, mockedEventService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      session: {},
    } as Request
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
    } as unknown as Response

    validateFormMock.mockReturnValue({
      isValid: false,
      errors: [
        {
          id: 'someId',
          errorMessage: 'Some error message',
        },
      ],
    })
    validateUUIDMock.mockReturnValue(true)
  })

  describe('GET', () => {
    it('should render view', async () => {
      const today = new Date()
      await handler.get(req, res)
      expect(validateUUIDMock).toHaveBeenCalled()
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        data: {
          reportAuthor: '',
          ...handler.data,
          'completionDate-day': `0${today.getDate()}`.slice(-2),
          'completionDate-month': `0${today.getMonth() + 1}`.slice(-2),
          'completionDate-year': today.getFullYear(),
        },
      })
    })
  })

  describe('POST', () => {
    it('should re-render view when form is invalid', async () => {
      await handler.post(req, res)
      expect(validateFormMock).toHaveBeenCalled()
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, expect.objectContaining({}))
    })

    it('should redirect to the correct view when form is valid', async () => {
      validateFormMock.mockReturnValue({
        isValid: true,
        errors: [],
      })
      const sendReportEventSpy = jest.spyOn(mockedEventService, 'sendReportEvent')
      await handler.post(req, res)
      expect(validateFormMock).toHaveBeenCalled()
      expect(sendReportEventSpy).toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/${req.params.reportId}/${handler.redirectPath}`)
    })
  })
})
