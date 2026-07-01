import { convert } from 'html-to-text'

const HAS_HTML_ELEMENT = /<(p|br|div|h[1-6]|ul|ol|li|strong|em|b|i|u|span|a|table|tr|td|th|thead|tbody)\b[^>]*>/i

export function htmlToPlainText(value: unknown): string {
  if (typeof value !== 'string' || value === '') return value as string
  if (!HAS_HTML_ELEMENT.test(value)) return value
  return convert(value, {
    wordwrap: false,
    selectors: [{ selector: 'a', options: { ignoreHref: true } }],
  })
}
