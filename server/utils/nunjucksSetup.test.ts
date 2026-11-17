import express from 'express'
import path from 'path'
import nunjucks from 'nunjucks'

jest.mock('../config', () => ({
  __esModule: true,
  default: {
    nonce: 'test-nonce',
    features: { richTextEditor: true, smartSurvey: false, unlockedSigning: false },
    session: { expiryMinutes: 120, warningMinutes: 2 },
    wproofreader: {
      bundleUrl: 'https://spellcheck.example.com/wscservice/wscbundle/wscbundle.js',
      host: 'spellcheck.example.com',
    },
  },
}))

import config from '../config'
import nunjucksSetup from './nunjucksSetup'

describe('feature flag app.locals', () => {
  it('sets app.locals.featureUnlockedSigning from config.features.unlockedSigning', () => {
    const app = express()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.unlockedSigning = true
    nunjucksSetup(app, path)
    expect(app.locals.featureUnlockedSigning).toBe(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.unlockedSigning = false
    nunjucksSetup(app, path)
    expect(app.locals.featureUnlockedSigning).toBe(false)
  })
})

describe('editableText nunjucks filter', () => {
  let env: nunjucks.Environment

  beforeEach(() => {
    const app = express()

    // Spy on nunjucks.configure so we can capture the Environment instance that
    // nunjucksSetup creates (nunjucksSetup does not return it, and we must not
    // modify it to do so).
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)

    // The spy captures the return value of the first (and only) configure call
    // made by nunjucksSetup. All filters are registered on that env.
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
  })

  it('passes the value through unchanged when the flag is ON', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
    const out = env.renderString('{{ value | editableText | safe }}', { value: '<p>hello</p>' })
    expect(out).toBe('<p>hello</p>')
  })

  it('strips HTML to plain text when the flag is OFF', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    const out = env.renderString('{{ value | editableText | safe }}', {
      value: '<p>hello <strong>world</strong></p>',
    })
    expect(out).toBe('hello world')
  })
})

describe('editorValue nunjucks filter', () => {
  let env: nunjucks.Environment

  beforeEach(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
  })

  it('wraps plain text into editor HTML when the flag is ON', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
    const out = env.renderString('{{ value | editorValue | safe }}', { value: 'a\n\nb' })
    expect(out).toBe('<p>a</p><p>b</p>')
  })

  it('strips HTML to plain text when the flag is OFF', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    const out = env.renderString('{{ value | editorValue | safe }}', {
      value: '<p>hello <strong>world</strong></p>',
    })
    expect(out).toBe('hello world')
  })

  it('returns empty string for empty input under either flag', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
    expect(env.renderString('{{ value | editorValue | safe }}', { value: '' })).toBe('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    expect(env.renderString('{{ value | editorValue | safe }}', { value: '' })).toBe('')
  })
})

describe('formatTime nunjucks filter', () => {
  let env: nunjucks.Environment

  beforeEach(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  it('formats a Date as 24-hour HH:MM in Europe/London (GMT)', () => {
    const out = env.renderString('{{ value | formatTime }}', { value: new Date('2026-01-15T14:05:00Z') })
    expect(out).toBe('14:05')
  })

  it('formats a Date as 24-hour HH:MM in Europe/London (BST)', () => {
    const out = env.renderString('{{ value | formatTime }}', { value: new Date('2026-07-15T13:05:00Z') })
    expect(out).toBe('14:05')
  })

  it('formats an ISO string', () => {
    const out = env.renderString('{{ value | formatTime }}', { value: '2026-01-15T09:07:00Z' })
    expect(out).toBe('09:07')
  })

  it('returns empty string for missing or invalid values', () => {
    expect(env.renderString('{{ value | formatTime }}', { value: null })).toBe('')
    expect(env.renderString('{{ value | formatTime }}', { value: 'not-a-date' })).toBe('')
  })
})

describe('formatDateLong nunjucks filter', () => {
  let env: nunjucks.Environment

  beforeEach(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  it('renders 2026-10-28T14:02:00Z as "28 October 2026"', () => {
    const out = env.renderString('{{ value | formatDateLong }}', { value: '2026-10-28T14:02:00Z' })
    expect(out).toBe('28 October 2026')
  })

  it('returns empty string for null/undefined/garbage', () => {
    expect(env.renderString('{{ value | formatDateLong }}', { value: null })).toBe('')
    expect(env.renderString('{{ value | formatDateLong }}', { value: undefined })).toBe('')
    expect(env.renderString('{{ value | formatDateLong }}', { value: 'not-a-date' })).toBe('')
  })
})

describe('formatTimeHM nunjucks filter', () => {
  let env: nunjucks.Environment

  beforeEach(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  it('renders 2026-10-28T14:02:00 as "14:02"', () => {
    const out = env.renderString('{{ value | formatTimeHM }}', { value: '2026-10-28T14:02:00Z' })
    expect(out).toBe('14:02')
  })

  it('returns empty string for falsy input', () => {
    expect(env.renderString('{{ value | formatTimeHM }}', { value: null })).toBe('')
    expect(env.renderString('{{ value | formatTimeHM }}', { value: undefined })).toBe('')
    expect(env.renderString('{{ value | formatTimeHM }}', { value: '' })).toBe('')
  })
})
