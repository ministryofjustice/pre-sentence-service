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

  it('decodes HTML entities inside HTML content', () => {
    expect(htmlToPlainText('<p>R&amp;D &lt; 5%</p>')).toBe('R&D < 5%')
    const nbspResult = htmlToPlainText('<p>a&nbsp;b</p>')
    expect(nbspResult).not.toContain('&nbsp;')
    expect(nbspResult).toMatch(/a.b/) // decoded to some whitespace-like character between a and b
  })

  it('handles mixed inline content inside a paragraph', () => {
    expect(htmlToPlainText('<p>plain <strong>bold</strong> end</p>')).toBe('plain bold end')
  })

  it('returns plain text unchanged', () => {
    expect(htmlToPlainText('already plain text')).toBe('already plain text')
  })

  it('preserves newlines in plain text (no HTML tags)', () => {
    expect(htmlToPlainText('Line one\nLine two\n\nParagraph two')).toBe('Line one\nLine two\n\nParagraph two')
  })

  it('treats a string with no HTML tags but with angle brackets as plain text', () => {
    expect(htmlToPlainText('5 < 10 and 10 > 5')).toBe('5 < 10 and 10 > 5')
  })

  it('preserves newlines around user-typed bracket tokens that are not HTML elements', () => {
    expect(htmlToPlainText('Line A\n\nLine B <pasted>\n\nLine C')).toBe('Line A\n\nLine B <pasted>\n\nLine C')
    expect(htmlToPlainText('text with <somecustomthing> in it')).toBe('text with <somecustomthing> in it')
  })
})
