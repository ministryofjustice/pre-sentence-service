import fs from 'fs'
import { Response } from 'express'
import PdfGenerationService from './pdfGenerationService'
import PreSentenceToDeliusService from './preSentenceToDeliusService'
import SourcesOfInformationService from './sourcesOfInformationService'
import ReportDetails from '../repositories/entities/reportDetails'
import config from '../config'
import { toReportOffences } from '../utils/apiDataTransformers'
import { ReportOffences } from '../@types/reportOffences'

jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('image'))

const storedOffences: ReportOffences = {
  mainOffence: { description: 'Stored main offence', code: 'ABC123', date: '2026-01-15' },
  additionalOffences: [{ description: 'Stored additional offence', code: 'DEF456', date: '2026-02-01' }],
}

const report = {
  id: 'report-1',
  reportType: 'PSR',
  offences: storedOffences,
  pages: [
    {
      questions: [
        { value: 'sourcesOfInformation', answer: 'cps_summary,dwp' },
        { value: 'riskToPublic', answer: 'low' },
        { value: 'riskToChildren', answer: 'low' },
        { value: 'riskToKnownAdults', answer: 'low' },
        { value: 'riskToStaff', answer: 'low' },
        { value: 'riskToPrisoners', answer: 'low' },
      ],
    },
  ],
} as unknown as ReportDetails

const legacyOffenceDetails = {
  mainOffence: {
    date: '2026-03-01',
    mainCategory: { code: 'XY', description: 'Legacy main category' },
    subCategory: { code: 'XYZ789', description: 'Legacy main offence' },
  },
  additionalOffences: [],
}

const legacyReport = {
  ...report,
  pages: report.pages!.map(page => ({
    ...page,
    questions: page.questions.filter(question => question.value !== 'riskToPrisoners'),
  })),
} as ReportDetails

const preSentenceToDeliusService = {
  getDefendantDetails: jest.fn().mockResolvedValue({
    name: { forename: 'Test', surname: 'Defendant' },
    dateOfBirth: '1990-01-15',
  }),
  getOffences: jest.fn().mockResolvedValue(legacyOffenceDetails),
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

  it('passes featureUnlockedSigning from config into the render data', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response
    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)
    const originalFlag = config.features.unlockedSigning

    try {
      config.features.unlockedSigning = true
      await service.generatePdf(report, res)

      expect(renderPDF).toHaveBeenCalledWith(
        'reports/psr',
        expect.objectContaining({ featureUnlockedSigning: true }),
        expect.anything()
      )
    } finally {
      config.features.unlockedSigning = originalFlag
    }
  })

  it('uses stored offences and does not call getOffences when report.offences is present', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response
    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)

    await service.generatePdf(report, res)

    expect(preSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
    expect(renderPDF).toHaveBeenCalledWith(
      'reports/psr',
      expect.objectContaining({
        data: expect.objectContaining({
          offenceData: storedOffences,
        }),
      }),
      expect.anything()
    )
  })

  it('falls back to fetching and mapping legacy offences when report.offences is absent', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response
    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)
    const reportWithoutStoredOffences = { ...report, offences: undefined } as unknown as ReportDetails
    const originalFakeAdditionalOffences = config.dev.fakeAdditionalOffences

    try {
      config.dev.fakeAdditionalOffences = false

      await service.generatePdf(reportWithoutStoredOffences, res)

      expect(preSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-1')
      expect(renderPDF).toHaveBeenCalledWith(
        'reports/psr',
        expect.objectContaining({
          data: expect.objectContaining({
            offenceData: toReportOffences(legacyOffenceDetails),
          }),
        }),
        expect.anything()
      )
    } finally {
      config.dev.fakeAdditionalOffences = originalFakeAdditionalOffences
    }
  })
})
