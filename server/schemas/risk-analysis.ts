import * as z from 'zod'
import { longText } from '../utils/validation'

export const riskAnalysisModel = z.object({
  riskToChildren: z.string().min(1, 'Select the level of risk to children from OASys'),
  riskToPublic: z.string().min(1, 'Select the level of risk to the public from OASys'),
  riskToKnownAdults: z.string().min(1, 'Select the level of risk to known adults from OASys'),
  riskToStaff: z.string().min(1, 'Select the level of risk to staff from OASys'),
  riskPredictors: longText({
    label: 'Risk predictors and likelihood of reoffending',
    requiredMessage: 'Confirm risk predictors and assess the likelihood of reoffending',
  }),
  riskAndHarmFactors: longText({
    label: 'Risks of harm and protective factors',
    requiredMessage: 'Analyse relevant risks of harm and protective factors',
  }),
})

const pickString = (...candidates: unknown[]): string => {
  for (const c of candidates) {
    if (typeof c === 'string' && c !== '') return c
  }
  return ''
}

const issuesFor = (data: Record<string, unknown>): string[] => {
  const result = riskAnalysisModel.safeParse({
    riskToChildren: pickString(data.riskToChildren, data.riskOfHarmForChildren),
    riskToPublic: pickString(data.riskToPublic, data.riskOfHarmForPublic),
    riskToKnownAdults: pickString(data.riskToKnownAdults, data.riskOfHarmForKnownAdults),
    riskToStaff: pickString(data.riskToStaff, data.riskOfHarmForStaff),
    riskPredictors: pickString(data.riskPredictors, data.riskPredictorsAndLikelihoodOfReoffending),
    riskAndHarmFactors: pickString(data.riskAndHarmFactors, data.relevantRisksAndProtectiveFactors),
  })
  if (result.success) return []
  return result.error.issues.map(i => String(i.path[0])).filter(Boolean)
}

const RISK_LEVEL_FIELDS = ['riskToChildren', 'riskToPublic', 'riskToKnownAdults', 'riskToStaff']

export const isRiskLevelsComplete = (data: Record<string, unknown>): boolean => {
  const issues = issuesFor(data)
  return RISK_LEVEL_FIELDS.every(f => !issues.includes(f))
}

export const isRiskPredictorsComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('riskPredictors')

export const isRiskAndHarmFactorsComplete = (data: Record<string, unknown>): boolean =>
  !issuesFor(data).includes('riskAndHarmFactors')
