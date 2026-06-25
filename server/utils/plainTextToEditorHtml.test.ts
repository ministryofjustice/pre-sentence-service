import { plainTextToEditorHtml } from './plainTextToEditorHtml'
import { htmlToPlainText } from './htmlToPlainText'

describe('plainTextToEditorHtml', () => {
  it('returns empty string for empty input', () => {
    expect(plainTextToEditorHtml('')).toBe('')
  })

  it('returns empty string for null', () => {
    expect(plainTextToEditorHtml(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(plainTextToEditorHtml(undefined)).toBe('')
  })

  it('wraps a single line in one <p>', () => {
    expect(plainTextToEditorHtml('hello')).toBe('<p>hello</p>')
  })

  it('turns a single \\n into <br> inside one <p>', () => {
    expect(plainTextToEditorHtml('line one\nline two')).toBe('<p>line one<br>line two</p>')
  })

  it('turns \\n\\n into two <p> blocks', () => {
    expect(plainTextToEditorHtml('para one\n\npara two')).toBe('<p>para one</p><p>para two</p>')
  })

  it('treats 3+ newlines as a single paragraph break', () => {
    expect(plainTextToEditorHtml('a\n\n\nb')).toBe('<p>a</p><p>b</p>')
  })

  it('mixes soft breaks and paragraphs correctly', () => {
    expect(plainTextToEditorHtml('a\nb\n\nc')).toBe('<p>a<br>b</p><p>c</p>')
  })

  it('escapes HTML-special characters', () => {
    expect(plainTextToEditorHtml('<script>&"\'')).toBe('<p>&lt;script&gt;&amp;&quot;&#39;</p>')
  })

  it('coerces non-string values to string then escapes', () => {
    expect(plainTextToEditorHtml(42 as unknown as string)).toBe('<p>42</p>')
  })

  it('round-trips through htmlToPlainText', () => {
    const input = 'line one\nline two\n\nparagraph two'
    expect(htmlToPlainText(plainTextToEditorHtml(input))).toBe(input)
  })
})
