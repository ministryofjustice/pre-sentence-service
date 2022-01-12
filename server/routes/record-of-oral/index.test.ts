import type { Express } from 'express'
import request from 'supertest'
import appWithAllRoutes from '../testutils/appSetup'

jest.mock('../../services/reportService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getReportById: () => {
        return new Promise(resolve => {
          process.nextTick(() => resolve({}))
        })
      },
    }
  })
})

describe('GET /record-of-oral', () => {
  let app: Express

  beforeAll(() => {
    app = appWithAllRoutes({})
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render index page', () => {
    return request(app)
      .get('/record-of-oral/123456789')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Record of Oral Pre-Sentence Report')
      })
  })
})
