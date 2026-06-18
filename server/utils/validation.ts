import * as z from 'zod'

export const LONG_TEXT_MAX = 20000
export const PROPOSED_SENTENCE_MAX = 4000

const NEWLINE_LIKE_CHARS = /\r\n|[\r\n\u2028\u2029]/g
const INVISIBLE_NON_COUNTING_CHARS = /[\u00AD\u034F\u061C\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g

export const maxLengthMessage = (label: string, max: number) =>
  `${label} must be ${max.toLocaleString()} characters or fewer`


export function normaliseForLength(value: string): string {
  return (value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(NEWLINE_LIKE_CHARS, '') // Remove newlines, including Unicode line/paragraph separators
    .replace(INVISIBLE_NON_COUNTING_CHARS, '') // Remove zero-width characters
}

export const plainTextLength = (value: string): number => normaliseForLength(value).trim().length

export const exceedsMaxPlainTextLength = (value: string, max: number): boolean => plainTextLength(value) > max

export const longText = ({
  label,
  requiredMessage,
  max = LONG_TEXT_MAX,
}: {
  label: string
  requiredMessage?: string
  max?: number
}) => {
  const normalized = z.string().transform(value => normaliseForLength(value).trim())
  const lengthRule = z.string().max(max, maxLengthMessage(label, max))

  if (requiredMessage) {
    return normalized.pipe(z.string().min(1, requiredMessage).and(lengthRule))
  }

  return normalized.pipe(lengthRule)
}
