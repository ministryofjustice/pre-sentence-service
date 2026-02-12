import { Request, Response } from 'express'

import PdfController from '../../controllers/pdf/pdfController'
import ReportService from '../../services/reportService'

const mockReportData = {
  id: 123,
  personId: 1,
  status: 'NOT_STARTED',
  origin: '10',
  reportType: 'some_report_type',
  pages: [
    {
      name: 'default',
      questions: [
        {
          id: 1,
          value: 'some_field_name',
          answer: 'Some field value',
        },
      ],
    },
  ],
  createdAt: new Date('2024-01-01'),
  createdBy: 'testuser',
  lastUpdatedBy: new Date('2024-01-01'),
  isDeleted: false,
  version: 1,
  person: {
    crn: 'X123456',
    names: { foreName: 'John', middleName: '', surname: 'Doe' },
    dateOfBirth: new Date('1990-01-01'),
    pnc: 'PNC123',
    mainOffence: 'Theft',
    court: { name: 'Test Court', localJusticeArea: 'Test Area' },
  },
}

jest.mock('../../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getReportById: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve(mockReportData))
        })
      },
    }
  })
})

describe('Route Handlers - View Report - PDF', () => {
  let handler: PdfController
  let req: Request
  let res: Response

  beforeAll(() => {
    const mockedReportService = new ReportService()
    handler = new PdfController(mockedReportService)
  })

  beforeEach(() => {
    req = {
      params: {
        reportId: '123',
      },
    } as unknown as Request

    res = {
      render: jest.fn(),
      renderPDF: jest.fn(),
      redirect: jest.fn(),
    } as unknown as Response
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('preview', () => {
    it('should render view with report data and html', async () => {
      await handler.preview(req, res)
      expect(res.render).toHaveBeenCalledWith(
        'reports/some_report_type',
        expect.objectContaining({
          data: expect.objectContaining({
            preview: true,
            reportStatus: 'NOT_STARTED',
            reportType: 'some_report_type',
            reportVersion: 1,
            some_field_name: 'Some field value',
          }),
          footerHtml: expect.any(String),
        })
      )
    })
  })

  describe('renderPdf', () => {
    it('should render PDF with report data', async () => {
      await handler.renderPdf(req, res)
      expect(res.renderPDF).toHaveBeenCalledWith(
        'reports/some_report_type',
        expect.objectContaining({
          data: expect.objectContaining({
            reportStatus: 'NOT_STARTED',
            reportType: 'some_report_type',
            reportVersion: 1,
            some_field_name: 'Some field value',
          }),
        }),
        expect.any(Object)
      )
    })

    it('should render PDF with correct filename', async () => {
      await handler.renderPdf(req, res)
      expect(res.renderPDF).toHaveBeenCalledWith(
        'reports/some_report_type',
        expect.any(Object),
        expect.objectContaining({
          filename: 'some_report_type_123.pdf',
        })
      )
    })
  })
})
