import type { CookieOptions, Request, Response } from 'express'
import config from '../config'

export const RETURN_TO_COOKIE = 'psr_return_to'

const cookieMaxAge = 24 * 60 * 60 * 1000

const nonContentPaths = ['/autherror', '/timed-out', '/sign-in', '/sign-out']

function isNonContentPath(returnTo: string): boolean {
  const path = returnTo.toLowerCase()
  return nonContentPaths.some(
    prefix => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(`${prefix}?`)
  )
}

export function safeReturnTo(returnTo: unknown): string {
  if (
    typeof returnTo === 'string' &&
    returnTo.startsWith('/') &&
    !returnTo.startsWith('//') &&
    !returnTo.includes('\\') &&
    !isNonContentPath(returnTo)
  ) {
    return returnTo
  }
  return '/'
}

function cookieOptions(): CookieOptions {
  return { httpOnly: true, secure: config.https, sameSite: 'lax', path: '/' }
}

export function writeReturnToCookie(res: Response, returnTo: unknown, options?: { timedOut?: boolean }): void {
  const value = JSON.stringify({ returnTo: safeReturnTo(returnTo), timedOut: options?.timedOut === true })
  res.cookie(RETURN_TO_COOKIE, value, { ...cookieOptions(), maxAge: cookieMaxAge })
}

export function readReturnToCookie(req: Request): { returnTo: string; timedOut: boolean } | null {
  const header = req.headers?.cookie
  if (!header) {
    return null
  }
  const pair = header
    .split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${RETURN_TO_COOKIE}=`))
  if (!pair) {
    return null
  }
  try {
    const parsed = JSON.parse(decodeURIComponent(pair.slice(RETURN_TO_COOKIE.length + 1)))
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.returnTo !== 'string') {
      return null
    }
    return { returnTo: safeReturnTo(parsed.returnTo), timedOut: parsed.timedOut === true }
  } catch {
    return null
  }
}

export function clearReturnToCookie(res: Response): void {
  res.clearCookie(RETURN_TO_COOKIE, cookieOptions())
}
