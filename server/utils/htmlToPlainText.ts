import { convert } from 'html-to-text'

export function htmlToPlainText(value: unknown): string {
  if (typeof value !== 'string' || value === '') return value as string
  return convert(value, {
    wordwrap: false,
    selectors: [{ selector: 'a', options: { ignoreHref: true } }],
  })
}
