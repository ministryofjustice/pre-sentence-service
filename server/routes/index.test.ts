import type { Express } from 'express'
import request from 'supertest'
import appWithAllRoutes from './testutils/appSetup'

jest.mock('../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllReportsPaginated: jest.fn().mockResolvedValue({
        reports: [],
        total: 0,
        totalPages: 0,
        currentPage: 1,
      }),
    }
  })
})

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({})
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /', () => {
  it('should render index page', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Create a new Pre-Sentence report')
      })
  })
})
