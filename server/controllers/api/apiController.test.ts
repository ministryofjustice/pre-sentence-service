import { Request, Response } from 'express'

import { SendMessageResult } from 'aws-sdk/clients/sqs'
import APIController from './apiController'
import ReportService, { IFieldValue, IReport } from '../../services/reportService'
import EventService, { IReportEventData } from '../../services/eventService'
import reportDefinition from '../../repositories/entities/reportDefinition'
import report from '../../repositories/entities/report'

jest.mock('../../services/reportService')
jest.mock('../../services/eventService')

describe('Route Handlers - API Controller', () => {
  let handler: APIController
  let req: Request
  let res: Response
  let getDefinitionByTypeSpy: jest.SpyInstance<Promise<reportDefinition>, [type: string]>
  let createReportSpy: jest.SpyInstance<Promise<report>, [report: IReport]>
  let getReportByIdSpy: jest.SpyInstance<Promise<report>, [id: string]>
  let updateFieldValuesSpy: jest.SpyInstance<Promise<void[]>, [fieldValues: IFieldValue[]]>
  let sendReportEventSpy: jest.SpyInstance<Promise<SendMessageResult>, [reportEventData: IReportEventData]>
  let deleteReportSpy: jest.SpyInstance<Promise<report>, [report: report]>

  beforeAll(() => {
    const mockedReportService = new ReportService()
    const mockedEventService = new EventService()
    getDefinitionByTypeSpy = jest.spyOn(mockedReportService, 'getDefinitionByType')
    createReportSpy = jest.spyOn(mockedReportService, 'createReport')
    getReportByIdSpy = jest.spyOn(mockedReportService, 'getReportById')
    updateFieldValuesSpy = jest.spyOn(mockedReportService, 'updateFieldValues')
    sendReportEventSpy = jest.spyOn(mockedEventService, 'sendReportEvent')
    deleteReportSpy = jest.spyOn(mockedReportService, 'deleteReport')
    handler = new APIController(mockedReportService, mockedEventService)
  })

  beforeEach(() => {
    req = {
      body: {
        crn: 'x12345b',
        eventNumber: 1,
      },
      params: {
        id: '27ea073b-7a38-4853-bdaa-b6a506053a9e',
        reportType: 'short-format',
      },
      session: {},
    } as unknown as Request
    res = {
      json: jest.fn(),
      render: jest.fn(),
      renderPDF: jest.fn(),
      status: jest.fn(() => {
        return {
          json: jest.fn(),
          send: jest.fn(),
          end: jest.fn(),
        }
      }),
    } as unknown as Response
  })

  describe('Create report', () => {
    it('should create a new report', async () => {
      await handler.createReport(req, res)
      expect(getDefinitionByTypeSpy).toHaveBeenCalledWith('short-format')
      expect(createReportSpy).toHaveBeenCalledWith({
        ...req.body,
        eventNumber: req.body.eventNumber.toString(),
        reportDefinitionId: 1,
      })
      expect(updateFieldValuesSpy).toHaveBeenCalledWith([
        {
          reportId: '27ea073b-7a38-4853-bdaa-b6a506053a9e',
          fieldId: 1,
          value: req.body.crn.toUpperCase(),
          version: 1,
        },
      ])
      expect(sendReportEventSpy).toHaveBeenCalledWith({
        reportId: '27ea073b-7a38-4853-bdaa-b6a506053a9e',
        eventNumber: '1',
        crn: req.body.crn.toUpperCase(),
        reportStatus: 'started',
      })
      expect(deleteReportSpy).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.status).toHaveBeenCalledTimes(1)
    })

    it('should fail if an invalid report type is specified', async () => {
      req = {
        body: {
          crn: 'x12345b',
          eventNumber: 1,
        },
        params: {
          reportType: 'invalid-report-type',
        },
        session: {},
      } as unknown as Request

      await handler.createReport(req, res)
      expect(deleteReportSpy).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.status).toHaveBeenCalledTimes(1)
    })
  })

  describe('Get report by ID', () => {
    it('should return the report', async () => {
      await handler.getReportById(req, res)
      expect(getReportByIdSpy).toHaveBeenCalledWith(req.params.id)
    })
  })

  describe('Get report PDF', () => {
    it('should return the report as a PDF', async () => {
      await handler.getPdfById(req, res)
      expect(getReportByIdSpy).toHaveBeenCalledWith(req.params.id)
      expect(res.renderPDF).toHaveBeenCalled()
    })
  })
})
