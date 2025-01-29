/* eslint-disable import/prefer-default-export */
const routes = {
  landing: {
    create: (_params: unknown) => '/landing',
  },
  defendantDetails: {
    create: (params: { id: string }) => `/report/${params.id}/defendant-details`,
  },
  offenceAnalysis: {
    create: (params: { id: string }) => `/report/${params.id}/offence-analysis`,
  },
  behaviouralFactors: {
    create: (params: { id: string }) => `/report/${params.id}/behavioural-factors`,
  },
  victimImpactAssessment: {
    create: (params: { id: string }) => `/report/${params.id}/victim-impact-assessment`,
  },
  culpabilityAndRisk: {
    create: (params: { id: string }) => `/report/${params.id}/culpability-and-risk`,
  },
  signReport: {
    create: (params: { id: string }) => `/report/${params.id}/sign-your-report`,
  },
  publishReport: {
    create: (params: { id: string }) => `/report/${params.id}/publish-report`,
  },
  summaryOfOffences: {
    create: (params: { id: string }) => `/report/${params.id}/summary-of-offences`,
  },
  summary: {
    create: (params: { id: string }) => `/report/${params.id}/summary`,
  },
}

type Routes = typeof routes
type RouteKey = keyof Routes
type RouteParams<T extends RouteKey> = Routes[T] extends { create: (params: infer P) => unknown } ? P : never

export const getRoutePath = <T extends RouteKey>(key: T, params: RouteParams<T>) => {
  const route = routes[key]

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return route.create(params)
}

type PageFlowKey = { displayName: string; routeKey: RouteKey }

export const reportPageFlow: PageFlowKey[] = [
  { displayName: 'Defendant details', routeKey: 'defendantDetails' },
  { displayName: 'Offence analysis', routeKey: 'offenceAnalysis' },
  { displayName: 'Behavioural factors', routeKey: 'behaviouralFactors' },
  { displayName: 'Victim impact assessment', routeKey: 'victimImpactAssessment' },
  { displayName: 'Culpability and risk', routeKey: 'culpabilityAndRisk' },
  { displayName: 'Summary of offences', routeKey: 'summaryOfOffences' },
  { displayName: 'Sign report', routeKey: 'signReport' },
  { displayName: 'Publish report', routeKey: 'publishReport' },
  { displayName: 'Summary', routeKey: 'summary' },
]

export const getNextPageKey = (currentPage: RouteKey) => {
  const index = reportPageFlow.findIndex(p => p.routeKey === currentPage)

  if (index < 0) {
    throw new Error(`Page ${currentPage} is not part of the flow`)
  }

  if (index + 1 > reportPageFlow.length) {
    throw new Error('There is no next page')
  }

  return reportPageFlow[index + 1].routeKey
}
