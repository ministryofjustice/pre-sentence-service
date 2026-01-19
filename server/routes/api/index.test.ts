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
    names: { foreName: 'John', middleName: '', surname: 'Doe' },
    dateOfBirth: new Date('1990-01-01'),
    pnc: 'PNC123',
    mainOffence: 'Theft',
    court: { name: 'Test Court', localJusticeArea: 'Test Area' },
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
    app = appWithApiRoutes({})
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should create a report', () => {
    return request(app)
      .post('/api/v1/report/record-of-oral')
      .send({
        crn: 'DX12340A',
        eventNumber: '100',
        names: { foreName: 'John', middleName: '', surname: 'Doe' },
        dateOfBirth: '1990-01-01',
        pnc: 'PNC123',
        mainOffence: 'Theft',
        court: { name: 'Test Court', localJusticeArea: 'Test Area' },
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(JSON.parse(res.text)).toMatchObject({
          id: expect.any(String), // ID converted to string for API
          reportType: 'record-of-oral',
          urn: expect.stringContaining('uk:gov:hmpps:pre-sentence-service:report:'),
          url: expect.stringContaining('/record-of-oral/'),
        })
      })
  })

  it('should support nDelius report types when creating a Record of Oral report', () => {
    return request(app)
      .post('/api/v1/report/oralReport')
      .send({
        crn: 'DX12340A',
        eventNumber: '100',
        names: { foreName: 'John', middleName: '', surname: 'Doe' },
        dateOfBirth: '1990-01-01',
        pnc: 'PNC123',
        mainOffence: 'Theft',
        court: { name: 'Test Court', localJusticeArea: 'Test Area' },
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(JSON.parse(res.text)).toMatchObject({
          reportType: 'record-of-oral',
          urn: expect.stringContaining('uk:gov:hmpps:pre-sentence-service:report:'),
        })
      })
  })

  it('should support nDelius report types when creating Short Format report', () => {
    return request(app)
      .post('/api/v1/report/shortFormatPreSentenceReport')
      .send({
        crn: 'DX12340A',
        eventNumber: '100',
        names: { foreName: 'John', middleName: '', surname: 'Doe' },
        dateOfBirth: '1990-01-01',
        pnc: 'PNC123',
        mainOffence: 'Theft',
        court: { name: 'Test Court', localJusticeArea: 'Test Area' },
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(JSON.parse(res.text)).toMatchObject({
          reportType: 'short-format',
          urn: expect.stringContaining('uk:gov:hmpps:pre-sentence-service:report:'),
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
})
