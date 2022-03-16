import { Request, Response } from 'express'

import PdfRoutes from '../../controllers/pdf/pdf'
import ReportService from '../../services/reportService'

const mockReportData = {
  status: 'NOT_STARTED',
  fieldValues: [
    {
      value: 'Some field value',
      field: {
        name: 'some_field_name',
      },
    },
  ],
  reportDefinition: {
    type: 'some_report_type',
    version: 1,
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
  let handler: PdfRoutes
  let req: Request
  let res: Response

  beforeAll(() => {
    const mockedReportService = new ReportService()
    handler = new PdfRoutes(mockedReportService)
  })

  beforeEach(() => {
    req = {
      params: {
        reportId: 'some_id',
      },
    } as unknown as Request

    res = {
      render: jest.fn(),
      renderPDF: jest.fn(),
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
          data: {
            preview: true,
            reportStatus: 'NOT_STARTED',
            reportType: 'some_report_type',
            reportVersion: 1,
            some_field_name: 'Some field value',
          },
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
          data: {
            reportStatus: 'NOT_STARTED',
            reportType: 'some_report_type',
            reportVersion: 1,
            some_field_name: 'Some field value',
          },
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
          filename: 'some_report_type_some_id.pdf',
        })
      )
    })
  })
})
