import { Request, Response } from 'express'
import ReportService, { RepositoryType } from '../../services/reportService'
import AutoSaveController from './autoSaveController'
import { createReportData } from './testdata.test'

jest.mock('../../services/reportService')

function getRequest(override: Record<string, unknown>): Request {
  return {
    params: {
      reportId: '12345678',
    },
    body: [
      {
        id: 'name',
        value: 'Some name',
      },
    ],
    session: {},
    ...override,
  } as unknown as Request
}

describe('Route Handlers - Auto Save Controller', () => {
  const mockedRepository: RepositoryType = {
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    insert: jest.fn(),
  } as unknown as RepositoryType

  let reportService: ReportService
  let handler: AutoSaveController
  let req: Request
  let res: Response
  const getReportByIdMock = jest.fn()

  beforeAll(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    reportService = new ReportService(() => mockedRepository)
    handler = new AutoSaveController(reportService)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    req = getRequest({})
    res = {
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response
  })

  const requestBody1 = [
    {
      id: 'proposal',
      value: '<p>initial text one</p>',
    },
  ]

  const requestBody2 = [
    {
      id: 'proposal',
      value: '<p>initial text one two </p>',
    },
  ]

  it('Auto save - req1 takes a while to process before reading the database state and req2 finishes meanwhile and updates the database', async () => {
    const dbReport = createReportData()
    const request1session = createReportData()
    const request2session = createReportData()

    const requestOne = getRequest({ session: request1session, body: requestBody1 })

    const requestTwo = getRequest({ session: request2session })

    getReportByIdMock.mockReturnValueOnce(dbReport)
    await handler.post(requestOne, res)
    expect(res.status).toHaveBeenCalledWith(201)
  })
})
