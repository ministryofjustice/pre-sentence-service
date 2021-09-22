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

describe('GET /short-format', () => {
  it('should render index page', () => {
    return request(app)
      .get('/short-format')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Short Format Pre-Sentence Report')
      })
  })
})
