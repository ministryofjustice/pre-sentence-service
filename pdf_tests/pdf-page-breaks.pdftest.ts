import { renderPsrHtml, convertToPdf, assertGotenbergUp } from './helpers/renderPdf'
import { extractPages, pageOf } from './helpers/pdfPages'
import { buildReportData, fullLengthProposal, sentences } from './helpers/fixtureData'

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

  it.each(sweep)('4,000-char proposal never splits (filler=%i sentences)', async filler => {
    const pages = await pagesFor(
      buildReportData({
        riskAndHarmFactors: `TOKEN_HARM_FACTORS ${sentences(filler)}`,
        proposedSentence: fullLengthProposal(),
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
        proposedSentence: fullLengthProposal(),
      }),
      opts
    )
    expect(pageOf(pages, 'TOKEN_PROPEND')).toBe(pageOf(pages, 'TOKEN_PROPSTART'))
  })
})

describe('subsections never orphan their heading', () => {
  // heading text (as rendered) -> sentinel token at the start of its content
  const subsections: [string, string][] = [
    ['Analysis of offences under consideration', 'TOKEN_OFFENCES_ANALYSIS'],
    ['Pattern of offending', 'TOKEN_OFFENCES_PATTERN'],
    ['Defendant behaviour and lifestyle assessment', 'TOKEN_BEHAVIOUR'],
    ['Risk of serious harm', 'TOKEN_ROSH'],
    ['Risk predictors and likelihood of reoffending', 'TOKEN_PREDICTORS'],
    ['Relevant risks of harm and protective factors', 'TOKEN_HARM_FACTORS'],
    ['The proposed sentence', 'TOKEN_PROPSTART'],
    ['Rationale for the proposed sentence', 'TOKEN_RATIONALE'],
    ['Alternative sentencing options', 'TOKEN_ALTERNATIVES'],
    ['Impact of a custodial sentence', 'TOKEN_IMPACT'],
    ['Report author', 'TOKEN_AUTHOR'],
  ]

  // Used to check at varying lengths of first field to push the page down
  const sweep = [0, 20, 40, 60, 80, 100, 120, 140, 160]

  it.each(sweep)('no heading is separated from its content (filler=%i sentences)', async filler => {
    const pages = await pagesFor(
      buildReportData({
        offencesUnderConsideration: `TOKEN_OFFENCES_ANALYSIS ${sentences(filler)}`,
      })
    )
    for (const [heading, token] of subsections) {
      expect(`${heading}:p${pageOf(pages, heading)}`).toBe(`${heading}:p${pageOf(pages, token)}`)
    }
  })
})
