/**
 * Normalizes any caught value into an Error object with optional HTTP status property.
 *
 * This handles cases where a catch block may receive non-Error values (e.g., strings,
 * plain objects, null). It converts them to proper Error instances while preserving
 * any HTTP status code from the caught value (whether it's already an Error or a plain object).
 *
 * @param value - Any value caught from a catch block (typically an Error, but may be unknown)
 * @returns An Error object with optional status property for HTTP errors
 */

export function ensureError(value: unknown): Error & { status?: number } {
  const error = value instanceof Error ? value : new Error(String(value))
  const errorWithStatus = error as Error & { status?: number }
  
  if (typeof (value as any)?.status === 'number') {
    errorWithStatus.status = (value as any).status
  }
  
  return errorWithStatus
}
