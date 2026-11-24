// This file is used for defining constants use for log events
export const LogEvent = {
  RequestFailed: 'request_failed',
  ValidationFailed: 'validation_failed',
  AccessDenied: 'access_denied',
  DependencyFailed: 'dependency_failed',
  DependencyRetry: 'dependency_retry',
} as const

export const LogDependency = {
  Redis: 'redis',
  Postgres: 'postgres',
  Gotenberg: 'gotenberg',
  Sns: 'sns',
  HmppsAuth: 'hmpps_auth',
  PreSentenceToDelius: 'pre_sentence_to_delius',
} as const

export const LogOperation = {
  Connect: 'connect',
  RenderPdf: 'render_pdf',
  Publish: 'publish',
} as const

export const AccessDeniedReason = {
  AuthSourceNotAllowed: 'auth_source_not_allowed',
  AuthSourceOrRoleNotAllowed: 'auth_source_or_role_not_allowed',
} as const

export const LogHttpMethod = {
  Get: 'GET',
  Post: 'POST',
} as const

export const ErrorType = {
  Authentication: 'authentication',
  ClientError: 'client_error',
  ServerError: 'server_error',
  Unknown: 'unknown',
} as const

export function classifyError(error: { status?: number }): string {
  if (error.status === 401 || error.status === 403) return ErrorType.Authentication
  if (error.status && error.status >= 400 && error.status < 500) return ErrorType.ClientError
  if (error.status && error.status >= 500) return ErrorType.ServerError
  return ErrorType.Unknown
}

export function extractEnvironment(url?: string): string {
  const targetUrl = url || process.env.APP_URL || ''
  if (targetUrl.includes('localhost')) return 'local'
  if (targetUrl.includes('-dev.')) return 'dev'
  if (targetUrl.includes('-preprod.')) return 'preprod'
  if (targetUrl.includes('.hmpps.service.justice.gov.uk')) return 'prod'
  return 'unknown'
}
