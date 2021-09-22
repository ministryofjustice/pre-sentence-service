import type { Express } from 'express'
import request from 'supertest'
import appWithAllRoutes from '../testutils/appSetup'

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({})
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /record-of-oral', () => {
  it('should render index page', () => {
    return request(app)
      .get('/record-of-oral')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Record of Oral Pre-Sentence Report')
      })
  })
})
