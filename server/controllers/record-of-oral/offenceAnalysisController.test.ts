import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

import OffenceAnalysisController from './offenceAnalysisController'
import ReportService from '../../services/reportService'

jest.mock('../../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getReportById: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
    }
  })
})

jest.mock('../../utils/formValidation')

describe('Route Handlers - Offence Analysis Controller', () => {
  const validateFormMock = validateForm as jest.MockedFunction<
    (formData: FormData, formValidation: FormValidation) => ValidatedForm
  >
  let mockedReportService: ReportService
  let handler: OffenceAnalysisController
  let req: Request
  let res: Response

  beforeAll(() => {
    mockedReportService = new ReportService()
    handler = new OffenceAnalysisController(mockedReportService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = {
      params: {},
      body: {},
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
  })

  describe('GET', () => {
    it('should render view', async () => {
      await handler.get(req, res)
      expect(res.render).toHaveBeenCalledWith(`${handler.path}/${handler.templatePath}`, {
        ...handler.templateValues,
        data: {
          reportAuthor: '',
          ...handler.data,
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
      await handler.post(req, res)
      expect(validateFormMock).toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/${req.params.reportId}/${handler.redirectPath}`)
    })
  })
})
