import * as z from 'zod'

export const LONG_TEXT_MAX = 10000

export const longTextMaxMessage = (label: string) => `${label} must be 10,000 characters or fewer`

export const longText = ({ label, requiredMessage }: { label: string; requiredMessage?: string }) => {
  const base = z.string().max(LONG_TEXT_MAX, longTextMaxMessage(label))
  return requiredMessage ? base.min(1, requiredMessage) : base
}
