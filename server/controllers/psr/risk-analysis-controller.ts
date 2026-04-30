import BaseController from './baseController'
import * as z from 'zod'
import { longText } from '../../utils/validation'

export const pageFields: Array<string> = [
  'pnc',
  'crn',
  'name',
  'riskPredictors',
  'riskAndHarmFactors',
  'riskToChildren',
  'riskToPublic',
  'riskToKnownAdults',
  'riskToStaff',
]

const riskAnalysisModel = z.object({
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

export default class RiskAnalysisController extends BaseController {
  override templatePath = 'risk-analysis'

  override redirectPath = 'sentencing-proposal'

  override pageFields = pageFields

  override model = riskAnalysisModel
}
