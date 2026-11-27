import { Request, Response } from 'express'
import EditOffencesController from './edit-offences-controller'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { ReportOffences } from '../../@types/reportOffences'
import * as offenceSnapshot from '../../utils/offenceSnapshot'

jest.mock('../../services/reportService')
jest.mock('../../services/preSentenceToDeliusService')
jest.mock('../../../logger')
jest.mock('../../utils/offenceSnapshot')

describe('EditOffencesController', () => {
  let controller: EditOffencesController
  let mockReportService: jest.Mocked<ReportService>
  let mockPreSentenceToDeliusService: jest.Mocked<PreSentenceToDeliusService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockEnsureStoredOffences: jest.MockedFunction<typeof offenceSnapshot.ensureStoredOffences>

  const storedOffences: ReportOffences = {
    mainOffence: { description: 'Criminal damage to property', code: '03001', date: '2024-04-12' },
    additionalOffences: [
      { description: 'Assault on emergency worker', code: '02004', date: '2024-04-12' },
      { description: 'Possession of class A drugs', code: '06001', date: '2024-04-13' },
    ],
  }

  const mockReport = {
    id: 'report-123',
    personId: 1,
    origin: '12345',
    reportType: 'PSR',
    status: 'NOT_STARTED',
    pages: [],
    createdAt: new Date(),
    createdBy: 'test-user',
    lastUpdatedBy: new Date(),
    isDeleted: false,
    offences: storedOffences,
    person: {
      id: 1,
      crn: 'X123456',
      createdAt: new Date(),
      createdBy: 'test-user',
      lastUpdatedBy: new Date(),
      isDeleted: false,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockReportService = new ReportService() as jest.Mocked<ReportService>
    mockPreSentenceToDeliusService = {
      getDefendantDetails: jest.fn(),
      getOffences: jest.fn(),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>

    mockEnsureStoredOffences = offenceSnapshot.ensureStoredOffences as jest.MockedFunction<
      typeof offenceSnapshot.ensureStoredOffences
    >

    mockRequest = {
      params: { reportId: 'report-123' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: {} as any,
      path: '/psr/report-123/edit-offences',
      query: {},
      body: {},
    } as Partial<Request>

    mockResponse = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: {},
    } as Partial<Response>

    mockReportService.getReportById = jest.fn().mockResolvedValue(mockReport)
    mockReportService.updateReportOffences = jest.fn().mockResolvedValue(mockReport)

    controller = new EditOffencesController(mockReportService, mockPreSentenceToDeliusService)
  })

  describe('GET', () => {
    it('renders psr/edit-offences with data.editOffences built from stored offences', async () => {
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockEnsureStoredOffences).toHaveBeenCalledWith(
        mockReport,
        mockReportService,
        mockPreSentenceToDeliusService
      )
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            editOffences: {
              mainOffenceDescription: 'Criminal damage to property',
              mainOffenceDate: '2024-04-12',
              mainOffenceCode: '03001',
              additionalOffences: [
                { description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' },
                { description: 'Possession of class A drugs', date: '2024-04-13', code: '06001' },
              ],
            },
            offencesAvailable: true,
          }),
        })
      )
    })

    it('snapshots offences via ensureStoredOffences when not already stored', async () => {
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockEnsureStoredOffences).toHaveBeenCalledTimes(1)
    })

    it('renders without editOffences and with offencesAvailable false when no snapshot exists and nDelius is down', async () => {
      mockEnsureStoredOffences.mockResolvedValue(null)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            offencesAvailable: false,
          }),
        })
      )
      const renderedData = (mockResponse.render as jest.Mock).mock.calls[0][1].data
      expect(renderedData.editOffences).toBeUndefined()
    })
  })

  describe('POST save', () => {
    it('calls updateReportOffences with offences built from the body and redirects to offence-analysis', async () => {
      mockRequest.body = {
        action: 'save',
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: ['Assault on emergency worker', 'Possession of class A drugs'],
        additionalOffenceDate: ['2024-04-12', '2024-04-13'],
        additionalOffenceCode: ['02004', '06001'],
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).toHaveBeenCalledWith('report-123', {
        mainOffence: { description: 'Criminal damage to property', date: '2024-04-12', code: '03001' },
        additionalOffences: [
          { description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' },
          { description: 'Possession of class A drugs', date: '2024-04-13', code: '06001' },
        ],
      })
      expect(mockResponse.redirect).toHaveBeenCalledWith('/psr/report-123/offence-analysis')
    })

    it('preserves form order and drops blank additional descriptions, trims main description', async () => {
      mockRequest.body = {
        mainOffenceDescription: '  Criminal damage to property  ',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: ['Possession of class A drugs', '', 'Assault on emergency worker'],
        additionalOffenceDate: ['2024-04-13', '', '2024-04-12'],
        additionalOffenceCode: ['06001', '', '02004'],
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).toHaveBeenCalledWith('report-123', {
        mainOffence: { description: 'Criminal damage to property', date: '2024-04-12', code: '03001' },
        additionalOffences: [
          { description: 'Possession of class A drugs', date: '2024-04-13', code: '06001' },
          { description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' },
        ],
      })
    })

    it('handles a single additional offence submitted as a plain string rather than an array', async () => {
      mockRequest.body = {
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: 'Assault on emergency worker',
        additionalOffenceDate: '2024-04-12',
        additionalOffenceCode: '02004',
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).toHaveBeenCalledWith('report-123', {
        mainOffence: { description: 'Criminal damage to property', date: '2024-04-12', code: '03001' },
        additionalOffences: [{ description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' }],
      })
      expect(mockResponse.redirect).toHaveBeenCalledWith('/psr/report-123/offence-analysis')
    })

    it('omits date and code keys when the submitted hidden fields are blank', async () => {
      mockRequest.body = {
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '',
        mainOffenceCode: '',
        additionalOffenceDescription: ['Assault on emergency worker'],
        additionalOffenceDate: [''],
        additionalOffenceCode: [''],
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).toHaveBeenCalledWith('report-123', {
        mainOffence: { description: 'Criminal damage to property' },
        additionalOffences: [{ description: 'Assault on emergency worker' }],
      })
    })

    it('trims additional offence descriptions before saving', async () => {
      mockRequest.body = {
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: ['  Assault on emergency worker  ', '   '],
        additionalOffenceDate: ['2024-04-12', ''],
        additionalOffenceCode: ['02004', ''],
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).toHaveBeenCalledWith('report-123', {
        mainOffence: { description: 'Criminal damage to property', date: '2024-04-12', code: '03001' },
        additionalOffences: [{ description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' }],
      })
    })

    it('does not call updateReportOffences when the report has no stored offences snapshot', async () => {
      mockReportService.getReportById = jest.fn().mockResolvedValue({ ...mockReport, offences: null })
      mockRequest.body = {
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: [],
        additionalOffenceDate: [],
        additionalOffenceCode: [],
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            offencesAvailable: false,
          }),
        })
      )
    })
  })

  describe('POST invalid', () => {
    it('rejects an empty main offence, re-renders without persisting', async () => {
      mockRequest.body = {
        mainOffenceDescription: '',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: [],
        additionalOffenceDate: [],
        additionalOffenceCode: [],
      }
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            offencesAvailable: true,
          }),
          formValidation: expect.objectContaining({
            isValid: false,
            errors: expect.objectContaining({
              mainOffenceDescription: 'You must include a Main Offence',
            }),
          }),
        })
      )
    })

    it('rejects a whitespace-only main offence', async () => {
      mockRequest.body = {
        mainOffenceDescription: '   ',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: [],
        additionalOffenceDate: [],
        additionalOffenceCode: [],
      }
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            offencesAvailable: true,
          }),
          formValidation: expect.objectContaining({
            isValid: false,
            errors: expect.objectContaining({
              mainOffenceDescription: 'You must include a Main Offence',
            }),
          }),
        })
      )
    })
  })

  describe('POST action=addOffence', () => {
    it('re-renders with one extra blank additional offence and persists nothing', async () => {
      mockRequest.body = {
        action: 'addOffence',
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: ['Assault on emergency worker'],
        additionalOffenceDate: ['2024-04-12'],
        additionalOffenceCode: ['02004'],
      }
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            editOffences: expect.objectContaining({
              additionalOffences: [
                { description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' },
                { description: '', date: '', code: '' },
              ],
            }),
            offencesAvailable: true,
          }),
        })
      )
    })
  })

  describe('POST removeOffence', () => {
    it('re-renders without the removed index and persists nothing', async () => {
      mockRequest.body = {
        removeOffence: '1',
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: ['Assault on emergency worker', 'Possession of class A drugs'],
        additionalOffenceDate: ['2024-04-12', '2024-04-13'],
        additionalOffenceCode: ['02004', '06001'],
      }
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            editOffences: expect.objectContaining({
              additionalOffences: [{ description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' }],
            }),
            offencesAvailable: true,
          }),
        })
      )
    })

    it('ignores an invalid remove index that is out of range', async () => {
      mockRequest.body = {
        removeOffence: '99',
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: ['Assault on emergency worker', 'Possession of class A drugs'],
        additionalOffenceDate: ['2024-04-12', '2024-04-13'],
        additionalOffenceCode: ['02004', '06001'],
      }
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            editOffences: expect.objectContaining({
              additionalOffences: [
                { description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' },
                { description: 'Possession of class A drugs', date: '2024-04-13', code: '06001' },
              ],
            }),
            offencesAvailable: true,
          }),
        })
      )
    })

    it('ignores a non-numeric remove index', async () => {
      mockRequest.body = {
        removeOffence: 'abc',
        mainOffenceDescription: 'Criminal damage to property',
        mainOffenceDate: '2024-04-12',
        mainOffenceCode: '03001',
        additionalOffenceDescription: ['Assault on emergency worker', 'Possession of class A drugs'],
        additionalOffenceDate: ['2024-04-12', '2024-04-13'],
        additionalOffenceCode: ['02004', '06001'],
      }
      mockEnsureStoredOffences.mockResolvedValue(storedOffences)

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateReportOffences).not.toHaveBeenCalled()
      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            editOffences: expect.objectContaining({
              additionalOffences: [
                { description: 'Assault on emergency worker', date: '2024-04-12', code: '02004' },
                { description: 'Possession of class A drugs', date: '2024-04-13', code: '06001' },
              ],
            }),
            offencesAvailable: true,
          }),
        })
      )
    })
  })
})
