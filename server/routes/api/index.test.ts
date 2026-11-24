import { Express } from 'express'
import request from 'supertest'
import { appWithApiRoutes } from '../testutils/appSetup'

const mockShortFormatData = {
  id: 123,
  personId: 1,
  status: 'NOT_STARTED',
  origin: '10',
  reportType: 'short-format',
  pages: [
    {
      name: 'default',
      questions: [
        {
          id: 1,
          value: 'some_field_name',
          answer: 'Some field value',
        },
      ],
    },
  ],
  createdAt: new Date('2024-01-01'),
  createdBy: 'testuser',
  lastUpdatedBy: new Date('2024-01-01'),
  isDeleted: false,
  version: 1,
  person: {
    crn: 'DX12340A',
  },
}

const mockOralReportData = {
  ...mockShortFormatData,
  reportType: 'record-of-oral',
}

const mockReportsData = [
  {
    id: 1,
    personId: 1,
    status: 'NOT_STARTED',
    origin: '20',
    reportType: 'short-format',
  },
  {
    id: 2,
    personId: 2,
    status: 'NOT_STARTED',
    origin: '42',
    reportType: 'short-format',
  },
]

const mockLockReport = jest.fn()
const mockUnlockReport = jest.fn()
const mockDeleteCompletedReport = jest.fn()

jest.mock('../../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createReport: (reportData: { reportType: string }) => {
        return new Promise(resolve => {
          process.nextTick(() => {
            const reportType = reportData.reportType
            const mockData = reportType === 'record-of-oral' ? mockOralReportData : mockShortFormatData
            resolve(mockData)
          })
        })
      },
      getReportById: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve(mockShortFormatData))
        })
      },
      getAllReportsByType: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve(mockReportsData))
        })
      },
      updateFieldValues: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve(mockShortFormatData))
        })
      },
      getDefinitionByType: () => {
        return new Promise(resolve => {
          process.nextTick(() =>
            resolve({
              id: 1,
            })
          )
        })
      },
      lockReport: (...args: unknown[]) => mockLockReport(...args),
      unlockReport: (...args: unknown[]) => mockUnlockReport(...args),
      deleteCompletedReport: (...args: unknown[]) => mockDeleteCompletedReport(...args),
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

const validUuid = '11111111-1111-1111-1111-111111111111'

describe('Route Handlers - API', () => {
  let app: Express

  beforeAll(() => {
    app = appWithApiRoutes({})
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    mockLockReport.mockReset()
    mockUnlockReport.mockReset()
    mockDeleteCompletedReport.mockReset()
  })

  it('should create a report', () => {
    return request(app)
      .post('/api/v1/report')
      .send({
        crn: 'DX12340A',
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(JSON.parse(res.text)).toMatchObject({
          id: expect.any(String), // ID converted to string for API
        })
      })
  })

  it('should validate that crn is required', () => {
    return request(app).post('/api/v1/report').send({}).expect(400)
  })

  it('should create a report with only crn', () => {
    return request(app)
      .post('/api/v1/report')
      .send({
        crn: 'X12345',
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(JSON.parse(res.text)).toMatchObject({
          id: expect.any(String),
        })
      })
  })

  it('should get a report by ID', () => {
    return request(app)
      .get('/api/v1/report/123')
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(JSON.parse(res.text)).toMatchObject({
          id: '123', // ID converted to string for API
          reportType: 'short-format',
        })
      })
  })

  it('should get all reports by report type', () => {
    return request(app)
      .get('/api/v1/reports/short-format')
      .expect('Content-Type', /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).toMatchObject({
          request: 'short-format',
          found: 2,
          results: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String), // IDs converted to strings
            }),
          ]),
        })
      })
  })

  it('PUT /v1/report/:id/lock returns 200 { id, status: LOCKED }', () => {
    mockLockReport.mockResolvedValue({ id: validUuid, status: 'LOCKED' })

    return request(app)
      .put(`/api/v1/report/${validUuid}/lock`)
      .expect(200)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ id: validUuid, status: 'LOCKED' })
      })
  })

  it('PUT /v1/report/:id/unlock returns 200 { id, status: COMPLETED }', () => {
    mockUnlockReport.mockResolvedValue({ id: validUuid, status: 'COMPLETED' })

    return request(app)
      .put(`/api/v1/report/${validUuid}/unlock`)
      .expect(200)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ id: validUuid, status: 'COMPLETED' })
      })
  })

  it('PUT /v1/report/:id/unlock echoes the restored status when unlock returns STARTED', () => {
    mockUnlockReport.mockResolvedValue({ id: validUuid, status: 'STARTED' })

    return request(app)
      .put(`/api/v1/report/${validUuid}/unlock`)
      .expect(200)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ id: validUuid, status: 'STARTED' })
      })
  })

  it('DELETE /v1/report/:id returns 200 { id, status: DELETED }', () => {
    mockDeleteCompletedReport.mockResolvedValue(undefined)

    return request(app)
      .delete(`/api/v1/report/${validUuid}`)
      .expect(200)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ id: validUuid, status: 'DELETED' })
      })
  })

  it('returns 400 { message } for a malformed uuid on all three routes', async () => {
    const malformedId = 'not-a-uuid'

    await request(app)
      .put(`/api/v1/report/${malformedId}/lock`)
      .expect(400)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ message: 'Invalid report id' })
      })

    await request(app)
      .put(`/api/v1/report/${malformedId}/unlock`)
      .expect(400)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ message: 'Invalid report id' })
      })

    await request(app)
      .delete(`/api/v1/report/${malformedId}`)
      .expect(400)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ message: 'Invalid report id' })
      })
  })

  it('returns 409 { message } when the service rejects with status 409 (e.g. lock on an already-LOCKED report)', () => {
    const error = Object.assign(new Error(`Report ${validUuid} is not in a COMPLETED state`), { status: 409 })
    mockLockReport.mockRejectedValue(error)

    return request(app)
      .put(`/api/v1/report/${validUuid}/lock`)
      .expect(409)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ message: `Report ${validUuid} is not in a COMPLETED state` })
      })
  })

  it('returns 404 { message } when the service rejects with status 404', () => {
    const error = Object.assign(new Error(`Report ${validUuid} not found`), { status: 404 })
    mockUnlockReport.mockRejectedValue(error)

    return request(app)
      .put(`/api/v1/report/${validUuid}/unlock`)
      .expect(404)
      .expect(res => {
        expect(JSON.parse(res.text)).toEqual({ message: `Report ${validUuid} not found` })
      })
  })

  it('passes the authenticated username from res.locals to the service', async () => {
    mockLockReport.mockResolvedValue({ id: validUuid, status: 'LOCKED' })

    await request(app).put(`/api/v1/report/${validUuid}/lock`).expect(200)

    expect(mockLockReport).toHaveBeenCalledWith(validUuid, 'user1')
  })
})
