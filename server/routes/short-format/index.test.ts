import type { Express } from 'express'
import request from 'supertest'
import appWithViewRoutes from '../testutils/appSetup'
import validateUUID from '../../utils/reportValidation'

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
jest.mock('../../utils/reportValidation')

describe('GET /short-format', () => {
  const validateUUIDMock = validateUUID as jest.MockedFunction<(uuid: string) => boolean>
  let app: Express

  beforeEach(() => {
    validateUUIDMock.mockReturnValue(true)
  })

  beforeAll(() => {
    app = appWithViewRoutes({})
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render index page', () => {
    return request(app)
      .get('/short-format/123456789')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Short Format Pre-Sentence Report')
      })
  })

  it('should redirect requests from nDelius', () => {
    return request(app)
      .get('/shortFormatPreSentenceReport/123456789')
      .expect(res => {
        expect(res.status).toBe(301)
        expect(res.text).toContain('Moved Permanently. Redirecting to /short-format/123456789')
      })
  })

  it('should redirect sub-section requests from nDelius', () => {
    return request(app)
      .get('/shortFormatPreSentenceReport/123456789/someSection')
      .expect(res => {
        expect(res.status).toBe(301)
        expect(res.text).toContain('Moved Permanently. Redirecting to /short-format/123456789/someSection')
      })
  })
})
