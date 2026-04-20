import { Request, Response } from 'express'

import SignYourReportController from './sign-your-report-controller'
import ReportService from '../../services/reportService'
import DomainEventService from '../../services/domainEventService'
import { mockedReportData } from '../../services/__mocks__/reportService'

describe('SignYourReportController', () => {
  let controller: SignYourReportController
  let reportService: ReportService
  let domainEventService: DomainEventService
  let req: Request
  let res: Response
  const completePages = [
    {
      name: 'defendant-details',
      questions: [
        { id: 0, value: 'name', answer: 'Jane Doe' },
        { id: 1, value: 'dateOfBirth', answer: '1990-01-01' },
        { id: 2, value: 'address-postcode', answer: 'SW1A 1AA' },
      ],
    },
    {
      name: 'offence-analysis',
      questions: [
        { id: 0, value: 'offencesUnderConsideration', answer: 'Analysis' },
        { id: 1, value: 'noPreviousOffences', answer: 'true' },
      ],
    },
    {
      name: 'psr-defendant-behaviour',
      questions: [{ id: 0, value: 'defendantBehaviour', answer: 'Assessment' }],
    },
    {
      name: 'risk-analysis',
      questions: [
        { id: 0, value: 'riskToChildren', answer: 'low' },
        { id: 1, value: 'riskToPublic', answer: 'low' },
        { id: 2, value: 'riskToKnownAdults', answer: 'low' },
        { id: 3, value: 'riskToStaff', answer: 'low' },
        { id: 4, value: 'riskPredictors', answer: 'Predictors' },
        { id: 5, value: 'riskAndHarmFactors', answer: 'Factors' },
      ],
    },
    {
      name: 'sentencing-proposal',
      questions: [
        { id: 0, value: 'proposedSentence', answer: 'Sentence' },
        { id: 1, value: 'proposedSentenceRationale', answer: 'Rationale' },
        { id: 2, value: 'alternativeSentencingOptions', answer: 'Alternatives' },
        { id: 3, value: 'sentenceImpact', answer: 'Impact' },
      ],
    },
    {
      name: 'sources-of-information',
      questions: [{ id: 0, value: 'sourcesOfInformation', answer: 'cps_summary' }],
    },
  ]

  beforeEach(() => {
    reportService = {
      getReportById: jest.fn(),
      updateReport: jest.fn().mockResolvedValue(mockedReportData),
      updateFieldValues: jest.fn().mockResolvedValue(mockedReportData),
    } as unknown as ReportService

    domainEventService = {
      publishPSRCompletedEvent: jest.fn().mockResolvedValue(undefined),
    } as unknown as DomainEventService

    controller = new SignYourReportController(reportService, undefined, domainEventService)

    req = {
      params: { reportId: '123' },
      path: '/psr/123/sign-your-report',
      session: {},
      body: {
        signReportName: 'Officer Name',
        isDangerousReport: 'no',
      },
      query: {},
    } as unknown as Request

    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: {
        user: {
          username: 'testuser',
        },
      },
    } as unknown as Response
  })

  it('does not allow final submission when review sections are incomplete', async () => {
    ;(reportService.getReportById as jest.Mock).mockResolvedValue({
      ...mockedReportData,
      pages: [],
    })

    await controller.post(req, res)

    expect(res.render).toHaveBeenCalledWith(
      'psr/sign-your-report',
      expect.objectContaining({
        reportId: '123',
        data: expect.objectContaining({
          reviewProgressBlocked: true,
        }),
        formValidation: expect.objectContaining({
          errors: expect.objectContaining({
            reviewProgress: 'Complete all sections in Review your progress before signing and locking this report',
          }),
        }),
      })
    )
    expect(res.redirect).not.toHaveBeenCalled()
  })

  it('allows final submission when all review sections are complete', async () => {
    ;(reportService.getReportById as jest.Mock).mockResolvedValue({
      ...mockedReportData,
      pages: completePages,
    })

    await controller.post(req, res)

    expect(res.redirect).toHaveBeenCalledWith('/psr/123/publish-report')
  })

  it('publishes domain event when report is signed and locked', async () => {
    ;(reportService.getReportById as jest.Mock).mockResolvedValue({
      ...mockedReportData,
      id: '123',
      pages: completePages,
      person: {
        ...mockedReportData.person,
        crn: 'X012345',
      },
    })

    await controller.post(req, res)

    expect(domainEventService.publishPSRCompletedEvent).toHaveBeenCalledWith({
      psrId: '123',
      crn: 'X012345',
      username: 'testuser',
      pdfUrl: expect.stringContaining('/psr/123/pdf'),
    })
    expect(res.redirect).toHaveBeenCalledWith('/psr/123/publish-report')
  })

  it('does not allow dangerous reports to be submitted without an SPO name', async () => {
    req.body = {
      signReportName: 'Officer Name',
      isDangerousReport: 'yes',
      spoName: '   ',
    }
    ;(reportService.getReportById as jest.Mock).mockResolvedValue({
      ...mockedReportData,
      pages: completePages,
    })

    await controller.post(req, res)

    expect(res.render).toHaveBeenCalledWith(
      'psr/sign-your-report',
      expect.objectContaining({
        reportId: '123',
        formValidation: expect.objectContaining({
          isValid: false,
          errors: expect.objectContaining({
            spoName: 'Enter the name of the SPO who reviewed the report',
          }),
        }),
      })
    )
    expect(res.redirect).not.toHaveBeenCalled()
  })
})
