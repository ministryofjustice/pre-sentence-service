import { Request, Response } from 'express'
import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

import CourtDetailsController from './courtDetailsController'

jest.mock('../../utils/formValidation')

describe('Route Handlers - Court Details Controller', () => {
  const validateFormMock = validateForm as jest.MockedFunction<
    (formData: FormData, formValidation: FormValidation) => ValidatedForm
  >
  const handler = new CourtDetailsController()
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
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
      expect(res.redirect).toHaveBeenCalledWith(`/${handler.path}/${handler.redirectPath}`)
    })
  })
})
