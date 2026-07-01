import { configureReportData } from './pdfFormat'
import config from '../config'

jest.mock('../config', () => ({
  __esModule: true,
  default: {
    features: { richTextEditor: true },
  },
}))

const makeReport = (answer: string) =>
  ({
    status: 'DRAFT',
    reportType: 'TYPE',
    version: 1,
    origin: 'O',
    submittedAt: null,
    pages: [
      {
        questions: [{ value: 'offenceAnalysis', answer }],
      },
    ],
    person: { crn: 'X1' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

describe('configureReportData', () => {
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
  })

  it('strips HTML to plain text even when the flag is ON', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
    const data = configureReportData(makeReport('<p>hello <strong>world</strong></p>'))
    expect(data.offenceAnalysis).toBe('hello world')
  })

  it('strips HTML to plain text when the flag is OFF', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    const data = configureReportData(makeReport('<p>hello <strong>world</strong></p>'))
    expect(data.offenceAnalysis).toBe('hello world')
  })

  it('leaves non-HTML plain text intact when the flag is OFF', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    const data = configureReportData(makeReport('plain answer'))
    expect(data.offenceAnalysis).toBe('plain answer')
  })

  it('handles a null answer without throwing when the flag is OFF', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    const data = configureReportData(makeReport(null as unknown as string))
    expect(data.offenceAnalysis).toBeNull()
  })
})

describe('configureReportData — always strips HTML', () => {
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
  })

  it('strips HTML even when the rich-text flag is ON', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = true
    const report = {
      pages: [
        {
          name: 'test-page',
          questions: [{ id: 1, value: 'someField', answer: '<p>hello <strong>world</strong></p>' }],
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
    const out = configureReportData(report)
    expect(out.someField).toBe('hello world')
  })

  it('leaves plain text unchanged when the rich-text flag is OFF', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(config as any).features.richTextEditor = false
    const report = {
      pages: [
        {
          name: 'test-page',
          questions: [{ id: 1, value: 'someField', answer: 'already plain' }],
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
    const out = configureReportData(report)
    expect(out.someField).toBe('already plain')
  })
})
