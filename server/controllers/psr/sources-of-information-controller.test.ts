import { Request, Response } from 'express'

import SourcesOfInformationController from './sources-of-information-controller'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import type { DefendantDetails as DefendantDetailsApiResponse } from '../../@types/preSentenceToDelius'
import { mockedReportData } from '../../services/__mocks__/reportService'

describe('Sources of Information Controller', () => {
  const sourcesOfInformation = [
    {
      isCustom: false,
      key: 'cps_summary',
      value: 'CPS summary',
    },
  ]

  const mockedReportService = {
    getSourcesOfInformation: jest.fn().mockResolvedValue(sourcesOfInformation),
    addCustomSourceOfInformation: jest.fn().mockResolvedValue(undefined),
    removeCustomSourceOfInformation: jest.fn().mockResolvedValue(undefined),
    sourceExistsForReport: jest.fn().mockResolvedValue(false),
    getReportById: jest.fn().mockResolvedValue(mockedReportData),
    updateReport: jest.fn().mockResolvedValue(mockedReportData),
    updateFieldValues: jest.fn().mockResolvedValue(mockedReportData),
    persistPartialFieldValues: jest.fn().mockResolvedValue({
      persisted: [],
      dropped: [],
    }),
  } as unknown as ReportService

  const mockApiDefendantDetails: DefendantDetailsApiResponse = {
    crn: 'X123456',
    eventNumber: 12345,
    name: {
      forename: 'Jane',
      middleName: '',
      surname: 'Doe',
    },
    dateOfBirth: '1990-01-01',
    mainAddress: {
      postcode: 'SW1A 1AA',
    },
  }

  const mockedPreSentenceToDeliusService = {
    getDefendantDetails: jest.fn().mockResolvedValue(mockApiDefendantDetails),
    getOffences: jest.fn(),
  } as unknown as PreSentenceToDeliusService

  let controller: SourcesOfInformationController
  let req: Request<{ reportId: string }>
  let res: Response

  beforeEach(() => {
    jest.clearAllMocks()

    controller = new SourcesOfInformationController(mockedReportService, mockedPreSentenceToDeliusService)

    req = {
      params: {
        reportId: '123',
      },
      body: {
        action: 'save-list',
        sourcesOfInformation: ['cps_summary'],
        source: 'A source that has not been added',
      },
      session: {},
      query: {},
    } as unknown as Request<{ reportId: string }>

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

  it('renders an error when "Save and continue" is clicked with an unadded source', async () => {
    await controller.post(req, res)

    expect(res.redirect).not.toHaveBeenCalled()

    expect(res.render).toHaveBeenCalledWith(
      'psr/sources-of-information',
      expect.objectContaining({
        reportId: '123',
        formValidation: expect.objectContaining({
          isValid: false,
          errors: {
            source: 'Add this source to the list',
          },
        }),
        data: expect.objectContaining({
          source: 'A source that has not been added',
          sourcesOfInformation: ['cps_summary'],
        }),
      })
    )

    expect(mockedReportService.addCustomSourceOfInformation).not.toHaveBeenCalled()
  })

  it('redirects when "Save and continue" is clicked with no pending source', async () => {
    req.body.source = ''

    await controller.post(req, res)

    expect(res.render).not.toHaveBeenCalled()
    expect(res.redirect).toHaveBeenCalledWith('/psr/123/preview-report')
  })

  it('adds the source when Add to list is clicked', async () => {
    req.body.action = 'add-source'
    req.body.source = 'A new source'

    await controller.post(req, res)

    expect(mockedReportService.addCustomSourceOfInformation).toHaveBeenCalledWith('123', 'A new source', 'testuser')

    expect(res.redirect).toHaveBeenCalledWith('/psr/123/sources-of-information#added-sources')
  })

  it('removes the source and redirects to the added sources list', async () => {
    req.body = {
      removeSource: 'custom-source-key',
      sourcesOfInformation: ['cps_summary'],
    }

    await controller.post(req, res)

    expect(mockedReportService.removeCustomSourceOfInformation).toHaveBeenCalledWith('123', 'custom-source-key')

    expect(res.redirect).toHaveBeenCalledWith('/psr/123/sources-of-information#added-sources')
  })

  it('renders an error when "Add to list" is clicked with a source over 80 characters', async () => {
    req.body = {
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: 'A'.repeat(81),
    }

    await controller.post(req, res)

    expect(res.redirect).not.toHaveBeenCalled()

    expect(mockedReportService.addCustomSourceOfInformation).not.toHaveBeenCalled()

    expect(mockedReportService.sourceExistsForReport).not.toHaveBeenCalled()

    expect(res.render).toHaveBeenCalledWith(
      'psr/sources-of-information',
      expect.objectContaining({
        reportId: '123',
        formValidation: expect.objectContaining({
          isValid: false,
          errors: expect.objectContaining({
            source: 'Source must be 80 characters or less',
          }),
        }),
        sourcesOfInformation: expect.arrayContaining([
          expect.objectContaining({
            key: 'cps_summary',
            checked: true,
          }),
        ]),
        data: expect.objectContaining({
          source: 'A'.repeat(81),
        }),
      })
    )
  })

  it('renders an error when "Add to list" is clicked with a blank source', async () => {
    req.body = {
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: '',
    }

    await controller.post(req, res)

    expect(res.redirect).not.toHaveBeenCalled()

    expect(mockedReportService.addCustomSourceOfInformation).not.toHaveBeenCalled()

    expect(mockedReportService.sourceExistsForReport).not.toHaveBeenCalled()

    expect(res.render).toHaveBeenCalledWith(
      'psr/sources-of-information',
      expect.objectContaining({
        reportId: '123',
        formValidation: expect.objectContaining({
          isValid: false,
          errors: expect.objectContaining({
            source: 'You cannot add a blank source to the list',
          }),
        }),
        sourcesOfInformation: expect.arrayContaining([
          expect.objectContaining({
            key: 'cps_summary',
            checked: true,
          }),
        ]),
        data: expect.objectContaining({
          source: '',
        }),
      })
    )
  })

  it('renders an error when "Add to list" is clicked with a duplicate source', async () => {
    ;(mockedReportService.sourceExistsForReport as jest.Mock).mockResolvedValue(true)

    req.body = {
      action: 'add-source',
      sourcesOfInformation: ['cps_summary'],
      source: 'CPS summary',
    }

    await controller.post(req, res)

    expect(mockedReportService.sourceExistsForReport).toHaveBeenCalledWith('123', 'CPS summary')

    expect(mockedReportService.addCustomSourceOfInformation).not.toHaveBeenCalled()

    expect(res.redirect).not.toHaveBeenCalled()

    expect(res.render).toHaveBeenCalledWith(
      'psr/sources-of-information',
      expect.objectContaining({
        reportId: '123',
        formValidation: expect.objectContaining({
          isValid: false,
          errors: expect.objectContaining({
            source: 'This source already exists',
          }),
        }),
        sourcesOfInformation: expect.arrayContaining([
          expect.objectContaining({
            key: 'cps_summary',
            checked: true,
          }),
        ]),
        data: expect.objectContaining({
          source: 'CPS summary',
          sourcesOfInformation: ['cps_summary'],
        }),
      })
    )
  })
})
