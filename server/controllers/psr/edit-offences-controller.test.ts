import { Request, Response } from 'express'
import EditOffencesController from './edit-offences-controller'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import type { OffenceDetails } from '../../@types/preSentenceToDelius'

jest.mock('../../services/reportService')
jest.mock('../../services/preSentenceToDeliusService')
jest.mock('../../../logger')

const apiOffences: OffenceDetails = {
  mainOffence: {
    date: '2026-05-17',
    mainCategory: { code: '030', description: 'Arson' },
    subCategory: { code: '03001', description: 'Allowing a chimney to be on fire' },
  },
  additionalOffences: [
    {
      date: '2026-09-08',
      mainCategory: { code: '080', description: 'Driving' },
      subCategory: { code: '08001', description: 'Driving after consuming alcohol or taking drugs' },
    },
  ],
}

describe('EditOffencesController', () => {
  let controller: EditOffencesController
  let mockReportService: jest.Mocked<ReportService>
  let mockPreSentenceToDeliusService: jest.Mocked<PreSentenceToDeliusService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  const reportWithStoredOffences = {
    id: 'report-123',
    reportType: 'PSR',
    status: 'STARTED',
    pages: [
      {
        name: 'edit-offences',
        questions: [
          { id: 0, value: 'mainOffence', answer: 'Stored main offence - 01/01/2026' },
          { id: 1, value: 'additionalOffences', answer: 'Stored additional - 02/01/2026' },
        ],
      },
    ],
    person: { id: 1, crn: 'X123456' },
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockReportService = new ReportService() as jest.Mocked<ReportService>
    mockReportService.getReportById = jest.fn().mockResolvedValue(reportWithStoredOffences)
    mockReportService.updateFieldValues = jest.fn().mockResolvedValue(null)
    mockReportService.updateReport = jest.fn().mockResolvedValue(null)
    mockReportService.getSourcesOfInformation = jest.fn().mockResolvedValue([])
    mockReportService.persistPartialFieldValues = jest.fn().mockResolvedValue({ persisted: [], dropped: [] })

    mockPreSentenceToDeliusService = {
      getDefendantDetails: jest.fn().mockRejectedValue(new Error('not stubbed')),
      getOffences: jest.fn().mockResolvedValue(apiOffences),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>

    mockRequest = {
      params: { reportId: 'report-123' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: {} as any,
      path: '/psr/report-123/edit-offences',
      query: {},
      body: {},
    } as Partial<Request>

    mockResponse = { render: jest.fn(), redirect: jest.fn(), locals: {} } as Partial<Response>

    controller = new EditOffencesController(mockReportService, mockPreSentenceToDeliusService)
  })

  describe('get', () => {
    it('renders stored offences without calling the offences API', async () => {
      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            mainOffence: 'Stored main offence - 01/01/2026',
            additionalOffences: 'Stored additional - 02/01/2026',
          }),
        })
      )
    })

    it('seeds offences from the API when none are stored', async () => {
      mockReportService.getReportById = jest.fn().mockResolvedValue({ ...reportWithStoredOffences, pages: [] })
      controller = new EditOffencesController(mockReportService, mockPreSentenceToDeliusService)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-123')
      expect(mockReportService.updateFieldValues).toHaveBeenCalledWith('report-123', [
        {
          pageName: 'edit-offences',
          questionId: 0,
          questionValue: 'mainOffence',
          answer: 'Allowing a chimney to be on fire - 17/05/2026',
        },
        {
          pageName: 'edit-offences',
          questionId: 1,
          questionValue: 'additionalOffences',
          answer: 'Driving after consuming alcohol or taking drugs - 08/09/2026',
        },
      ])
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({ mainOffence: 'Allowing a chimney to be on fire - 17/05/2026' }),
        })
      )
    })
  })

  describe('post', () => {
    it('saves trimmed offences and redirects back to offence analysis', async () => {
      mockRequest.body = {
        mainOffence: '  Edited offence - 05/05/2026  ',
        additionalOffences: 'One - 01/01/2026\n\n  Two - 02/01/2026 \n',
        CSRFToken: 'token',
        reportId: 'report-123',
        pageName: 'edit-offences',
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateFieldValues).toHaveBeenCalledWith('report-123', [
        {
          pageName: 'edit-offences',
          questionId: 0,
          questionValue: 'mainOffence',
          answer: 'Edited offence - 05/05/2026',
        },
        {
          pageName: 'edit-offences',
          questionId: 1,
          questionValue: 'additionalOffences',
          answer: 'One - 01/01/2026\nTwo - 02/01/2026',
        },
      ])
      expect(mockResponse.redirect).toHaveBeenCalledWith('/psr/report-123/offence-analysis')
    })

    it('re-renders with an error and persists nothing when main offence is empty', async () => {
      mockRequest.body = {
        mainOffence: '',
        additionalOffences: 'Kept in form - 01/01/2026',
        CSRFToken: 'token',
        reportId: 'report-123',
        pageName: 'edit-offences',
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockReportService.updateFieldValues).not.toHaveBeenCalled()
      expect(mockReportService.persistPartialFieldValues).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          formValidation: expect.objectContaining({
            isValid: false,
            errors: expect.objectContaining({ mainOffence: 'You must include a main offence' }),
          }),
          data: expect.objectContaining({ additionalOffences: 'Kept in form - 01/01/2026' }),
        })
      )
    })
  })
})
