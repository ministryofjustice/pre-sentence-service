import * as z from 'zod'

export const LONG_TEXT_MAX = 20000
export const PROPOSED_SENTENCE_MAX = 4000

export const maxLengthMessage = (label: string, max: number) =>
  `${label} must be ${max.toLocaleString()} characters or fewer`

export const longText = ({
  label,
  requiredMessage,
  max = LONG_TEXT_MAX,
}: {
  label: string
  requiredMessage?: string
  max?: number
}) => {
  const base = z.string().max(max, maxLengthMessage(label, max))
  return requiredMessage ? base.min(1, requiredMessage) : base
}
