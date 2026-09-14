import { renderPsrHtml, convertToPdf, assertGotenbergUp } from './helpers/renderPdf'
import { extractPages } from './helpers/pdfPages'
import { buildReportData } from './helpers/fixtureData'

beforeAll(async () => {
  await assertGotenbergUp()
})

// PDF text extraction inserts variable whitespace between items, so all
// matching is done on fully squashed text (as in pdf-page-breaks.pdftest.ts).
const squash = (text: string): string => text.replace(/\s+/g, '')

async function documentTextFor(data: Record<string, unknown>, opts: { draft?: boolean } = {}): Promise<string> {
  const pdf = await convertToPdf(renderPsrHtml(data), opts)
  const pages = await extractPages(pdf)
  return squash(pages.join(' '))
}

describe('sources of information section', () => {
  it('lists predefined sources with their Yes/No usage', async () => {
    const text = await documentTextFor(buildReportData())
    expect(text).toContain(squash('CPS summary TOKEN_SOURCES (Yes)'))
    expect(text).toContain(squash('Interview (Yes)'))
    expect(text).toContain(squash('Previous convictions (No)'))
  })

  it('appears after the sentencing proposal and before completion details', async () => {
    const text = await documentTextFor(buildReportData())
    const heading = text.indexOf(squash('Sources of information'))
    expect(heading).toBeGreaterThan(text.indexOf(squash('Sentencing proposal')))
    expect(heading).toBeGreaterThan(text.indexOf('TOKEN_PROPEND'))
    expect(heading).toBeLessThan(text.indexOf(squash('Completion details')))
  })

  it('shows custom sources under an Other sources heading', async () => {
    const text = await documentTextFor(
      buildReportData({
        sourcesOfInformationList: {
          predefined: [{ label: 'CPS summary', used: true }],
          custom: [
            { label: 'DWP TOKEN_CUSTOM', used: true },
            { label: 'Housing association', used: false },
          ],
        },
      })
    )
    expect(text).toContain(squash('Other sources'))
    expect(text).toContain(squash('DWP TOKEN_CUSTOM (Yes)'))
    expect(text).toContain(squash('Housing association (No)'))
  })

  it('omits the Other sources heading when there are no custom sources', async () => {
    const text = await documentTextFor(buildReportData())
    expect(text).not.toContain(squash('Other sources'))
  })

  it('renders the section in the draft PDF', async () => {
    const text = await documentTextFor(buildReportData(), { draft: true })
    expect(text).toContain(squash('Sources of information'))
    expect(text).toContain(squash('CPS summary TOKEN_SOURCES (Yes)'))
  })
})
