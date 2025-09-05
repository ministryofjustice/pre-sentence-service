import BaseController from './baseController'
import * as z from 'zod'

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
  riskToStaff: z.string().min(1, 'Select the level of risk to known adults from OASys'),
  riskPredictors: z.string().min(1, 'Confirm risk predictors and assess the likelihood of reoffending'),
  riskAndHarmFactors: z.string().min(1, 'Analyse relevant risks of harm and protective factors'),
})

export default class RiskAnalysisController extends BaseController {
  override templatePath = 'risk-analysis'

  override redirectPath = 'sentencing-proposal'

  override pageFields = pageFields

  override model = riskAnalysisModel
}
