import { htmlToPlainText } from './htmlToPlainText'

describe('htmlToPlainText', () => {
  it('returns empty string unchanged', () => {
    expect(htmlToPlainText('')).toBe('')
  })

  it('returns non-string values unchanged', () => {
    expect(htmlToPlainText(null as unknown as string)).toBeNull()
    expect(htmlToPlainText(undefined as unknown as string)).toBeUndefined()
    expect(htmlToPlainText(42 as unknown as string)).toBe(42)
  })

  it('strips bold/italic/underline tags but keeps the text', () => {
    expect(htmlToPlainText('<strong>bold</strong>')).toBe('bold')
    expect(htmlToPlainText('<em>italic</em>')).toBe('italic')
    expect(htmlToPlainText('<u>under</u>')).toBe('under')
  })

  it('turns paragraphs into newline-separated text', () => {
    expect(htmlToPlainText('<p>one</p><p>two</p>')).toBe('one\n\ntwo')
  })

  it('turns <br> into a newline', () => {
    expect(htmlToPlainText('one<br>two')).toBe('one\ntwo')
  })

  it('renders bulleted lists with bullet markers', () => {
    const out = htmlToPlainText('<ul><li>a</li><li>b</li></ul>')
    expect(out).toContain('a')
    expect(out).toContain('b')
    expect(out).toMatch(/\*|•|-/) // accept any of html-to-text's bullet styles
  })

  it('renders numbered lists with index markers', () => {
    const out = htmlToPlainText('<ol><li>a</li><li>b</li></ol>')
    expect(out).toContain('1.')
    expect(out).toContain('2.')
  })

  it('decodes HTML entities', () => {
    expect(htmlToPlainText('R&amp;D &lt; 5%')).toBe('R&D < 5%')
    // html-to-text decodes &nbsp; to U+00A0 (non-breaking space), not a regular space — assert the entity is gone
    const nbspResult = htmlToPlainText('a&nbsp;b')
    expect(nbspResult).not.toContain('&nbsp;')
    expect(nbspResult).toMatch(/a.b/) // decoded to some whitespace-like character between a and b
  })

  it('handles mixed inline content inside a paragraph', () => {
    expect(htmlToPlainText('<p>plain <strong>bold</strong> end</p>')).toBe('plain bold end')
  })

  it('returns plain text unchanged', () => {
    expect(htmlToPlainText('already plain text')).toBe('already plain text')
  })
})
