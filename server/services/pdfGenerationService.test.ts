import fs from 'fs'
import { Response } from 'express'
import PdfGenerationService from './pdfGenerationService'
import PreSentenceToDeliusService from './preSentenceToDeliusService'
import SourcesOfInformationService from './sourcesOfInformationService'
import ReportDetails from '../repositories/entities/reportDetails'

jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('image'))

const baseQuestions = [
  { value: 'sourcesOfInformation', answer: 'cps_summary,dwp' },
  { value: 'riskToPublic', answer: 'low' },
  { value: 'riskToChildren', answer: 'low' },
  { value: 'riskToKnownAdults', answer: 'low' },
  { value: 'riskToStaff', answer: 'low' },
  { value: 'riskToPrisoners', answer: 'low' },
]

const report = {
  id: 'report-1',
  reportType: 'PSR',
  pages: [
    {
      questions: [
        ...baseQuestions,
        { value: 'mainOffence', answer: 'Allowing a chimney to be on fire - 17/05/2026' },
        {
          value: 'additionalOffences',
          answer:
            'Driving after consuming alcohol or taking drugs - 08/09/2026\nDriving after consuming alcohol or taking drugs - 09/09/2026',
        },
      ],
    },
  ],
} as unknown as ReportDetails

const legacyReport = {
  id: 'report-1',
  reportType: 'PSR',
  pages: [
    {
      questions: baseQuestions.filter(question => question.value !== 'riskToPrisoners'),
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
  beforeEach(() => {
    ;(preSentenceToDeliusService.getOffences as jest.Mock).mockClear()
  })

  it('builds offence data from the stored report without calling the offences API', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response

    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)
    await service.generatePdf(report, res)

    expect(preSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
    expect(renderPDF).toHaveBeenCalledWith(
      'reports/psr',
      expect.objectContaining({
        data: expect.objectContaining({
          offenceData: {
            mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
            additionalOffences: [
              'Driving after consuming alcohol or taking drugs - 08/09/2026',
              'Driving after consuming alcohol or taking drugs - 09/09/2026',
            ],
          },
        }),
      }),
      expect.anything()
    )
  })

  it('renders an empty offence section when the report has no stored offences', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response
    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)

    await service.generatePdf(legacyReport, res)

    expect(renderPDF).toHaveBeenCalledWith(
      'reports/psr',
      expect.objectContaining({
        data: expect.objectContaining({
          offenceData: { mainOffence: '', additionalOffences: [] },
        }),
      }),
      expect.anything()
    )
  })

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

  it('generates a PDF when an older report has no prisoner risk value', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response
    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)

    await service.generatePdf(legacyReport, res)

    expect(renderPDF).toHaveBeenCalledWith(
      'reports/psr',
      expect.objectContaining({
        data: expect.objectContaining({
          riskToPrisoners: '',
        }),
      }),
      expect.anything()
    )
  })
})
