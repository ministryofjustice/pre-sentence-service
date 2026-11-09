// This file is used for defining constants use for log events
export const LogEvent = {
  RequestFailed: 'request_failed',
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
