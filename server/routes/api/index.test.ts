import { Express } from 'express'
import request from 'supertest'
import appWithAllRoutes from '../testutils/appSetup'

const mockReportData = {
  id: '0a15ce57-c46e-4b71-84f0-49dbed4bb81e',
  status: 'NOT_STARTED',
  reportDefinitionId: 1,
  entityId: '10',
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

const mockReportsData = [
  {
    id: '396c6e6e-f1e5-420b-94c4-0e6ecabdbf96',
    status: 'NOT_STARTED',
    reportDefinitionId: 2,
    entityId: '20',
  },
  {
    id: '0877ed35-e59a-4e94-b2bd-5d2283dd7dd7',
    status: 'NOT_STARTED',
    reportDefinitionId: 2,
    entityId: '42',
  },
]

jest.mock('../../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createReport: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve(mockReportData))
        })
      },
      getReportById: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve(mockReportData))
        })
      },
      getAllReportsByType: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve(mockReportsData))
        })
      },
      updateFieldValues: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
      getDefinitionByType: () => {
        return new Promise(resolve => {
          process.nextTick(() =>
            resolve({
              id: 1,
              fields: [
                {
                  name: 'crn',
                  id: 3,
                },
              ],
            })
          )
        })
      },
    }
  })
})

jest.mock('../../services/eventService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      sendReportEvent: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
    }
  })
})

describe('Route Handlers - API', () => {
  let app: Express

  beforeAll(() => {
    app = appWithAllRoutes({})
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should create a report', () => {
    return request(app)
      .post('/api/v1/report/record-of-oral')
      .send({ crn: 'DX12340A', entityId: '100' })
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.text).toEqual(JSON.stringify(mockReportData))
      })
  })

  it('should get a report by ID', () => {
    return request(app)
      .get('/api/v1/report/0a15ce57-c46e-4b71-84f0-49dbed4bb81e')
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.text).toEqual(JSON.stringify(mockReportData))
      })
  })

  it('should get all reports by report type', () => {
    return request(app)
      .get('/api/v1/reports/short-format')
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.text).toEqual(
          JSON.stringify({
            request: 'short-format',
            found: 2,
            results: mockReportsData,
          })
        )
      })
  })
})