import express from 'express'
import path from 'path'
import nunjucks from 'nunjucks'

jest.mock('../config', () => ({
  __esModule: true,
  default: {
    nonce: 'test-nonce',
    features: { richTextEditor: true },
    wproofreader: {
      licenceKey: 'k',
      bundleUrl: 'https://svc.webspellchecker.net/bundle.js',
      host: 'svc.webspellchecker.net',
    },
  },
}))

import config from '../config'
import nunjucksSetup from './nunjucksSetup'

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
