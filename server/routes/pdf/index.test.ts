import { Request, Response } from 'express'

import PdfRoutes, { tempData } from '../../controllers/pdf/pdf'

describe('Route Handlers - View Report - PDF', () => {
  const handler = new PdfRoutes()
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      params: {
        reportType: 'some_report_type',
        id: 'some_id',
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
            ...tempData, // @TODO: Replace with mock database response
          },
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
            ...tempData, // @TODO: Replace with mock database response
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
