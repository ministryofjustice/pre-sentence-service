import { renderPsrHtml, convertToPdf, assertGotenbergUp } from './helpers/renderPdf'
import { extractPages, pageOf } from './helpers/pdfPages'
import { buildReportData, pageFittingProposal, sentences } from './helpers/fixtureData'

beforeAll(async () => {
  await assertGotenbergUp()
})

async function pagesFor(data: Record<string, unknown>, opts: { draft?: boolean } = {}): Promise<string[]> {
  const pdf = await convertToPdf(renderPsrHtml(data), opts)
  return extractPages(pdf)
}

describe('sentencing proposal box', () => {
  // Sweep the preceding free-text length so the box crosses page boundaries at
  // different offsets; 0-150 sentences walks the box through more than a full
  // page of positions.
  const sweep = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150]

  it.each(sweep)('page-filling proposal never splits (filler=%i sentences)', async filler => {
    const pages = await pagesFor(
      buildReportData({
        riskAndHarmFactors: `TOKEN_HARM_FACTORS ${sentences(filler)}`,
        proposedSentence: pageFittingProposal(),
      })
    )
    expect(pageOf(pages, 'TOKEN_PROPEND')).toBe(pageOf(pages, 'TOKEN_PROPSTART'))
  })

  it('short proposal that fits stays on the current page (no forced break)', async () => {
    // Minimal content everywhere: the proposal must share a page with the
    // section that precedes it rather than being pushed to a fresh page.
    const pages = await pagesFor(buildReportData())
    expect(pageOf(pages, 'TOKEN_PROPSTART')).toBe(pageOf(pages, 'TOKEN_HARM_FACTORS'))
  })

  it.each([{ draft: true }, { draft: false }])('box stays intact in draft and final (%o)', async opts => {
    const pages = await pagesFor(
      buildReportData({
        riskAndHarmFactors: `TOKEN_HARM_FACTORS ${sentences(90)}`,
        proposedSentence: pageFittingProposal(),
      }),
      opts
    )
    expect(pageOf(pages, 'TOKEN_PROPEND')).toBe(pageOf(pages, 'TOKEN_PROPSTART'))
  })
})

describe('sentencing proposal section keeps its heading', () => {
  // Used to check at varying lengths of a preceding field to push the page down
  const sweep = [0, 20, 40, 60, 80, 100, 120, 140, 160]

  it.each(sweep)('"Sentencing proposal" heading stays with the box (filler=%i sentences)', async filler => {
    const pages = await pagesFor(
      buildReportData({
        offencesUnderConsideration: `TOKEN_OFFENCES_ANALYSIS ${sentences(filler)}`,
      })
    )
    expect(pageOf(pages, 'Sentencing proposal')).toBe(pageOf(pages, 'TOKEN_PROPSTART'))
  })
})
