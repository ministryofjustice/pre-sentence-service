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
  jest.clearAllMocks()
})

describe('GET /extend-session', () => {
  it('returns 204 so the timeout warning can keep the session alive', () => {
    return request(app).get('/extend-session').expect(204)
  })
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

  it('renders the timeout warning with timing derived from the session expiry', () => {
    return request(app)
      .get('/')
      .expect(res => {
        expect(res.text).toContain('data-module="govuk-timeout-warning"')
        expect(res.text).toContain('data-minutes-idle-timeout="118"')
        expect(res.text).toContain('data-minutes-modal-visible="2"')
        expect(res.text).toContain('You are about to be signed out')
        expect(res.text).toContain('Stay signed in')
      })
  })
})
