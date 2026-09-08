import fs from 'fs'
import { Response } from 'express'
import PdfGenerationService from './pdfGenerationService'
import PreSentenceToDeliusService from './preSentenceToDeliusService'
import SourcesOfInformationService from './sourcesOfInformationService'
import ReportDetails from '../repositories/entities/reportDetails'

jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('image'))

const report = {
  id: 'report-1',
  reportType: 'PSR',
  pages: [
    {
      questions: [
        { value: 'sourcesOfInformation', answer: 'cps_summary,dwp' },
        { value: 'riskToPublic', answer: 'low' },
        { value: 'riskToChildren', answer: 'low' },
        { value: 'riskToKnownAdults', answer: 'low' },
        { value: 'riskToStaff', answer: 'low' },
      ],
    },
  ],
} as unknown as ReportDetails

const preSentenceToDeliusService = {
  getDefendantDetails: jest.fn().mockResolvedValue({
    name: { forename: 'Test', surname: 'Defendant' },
    dateOfBirth: '1990-01-15',
  }),
  getOffences: jest.fn().mockResolvedValue({}),
} as unknown as PreSentenceToDeliusService

const sourcesOfInformationService = {
  getSourcesOfInformation: jest.fn().mockResolvedValue([
    { key: 'cps_summary', value: 'CPS summary', isCustom: false },
    { key: 'interview', value: 'Interview', isCustom: false },
    { key: 'dwp', value: 'DWP', isCustom: true },
  ]),
} as unknown as SourcesOfInformationService

describe('PdfGenerationService', () => {
  it('resolves the report sources and passes them to the PDF template', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response

    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)
    await service.generatePdf(report, res)

    expect(sourcesOfInformationService.getSourcesOfInformation).toHaveBeenCalledWith('report-1')
    expect(renderPDF).toHaveBeenCalledWith(
      'reports/psr',
      expect.objectContaining({
        data: expect.objectContaining({
          sourcesOfInformationList: {
            predefined: [
              { label: 'CPS summary', used: true },
              { label: 'Interview', used: false },
            ],
            custom: [{ label: 'DWP', used: true }],
          },
        }),
      }),
      expect.anything()
    )
  })
})
