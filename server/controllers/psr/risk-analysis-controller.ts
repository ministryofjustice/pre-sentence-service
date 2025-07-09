import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['pnc', 'crn', 'name', 'riskPredictors', 'riskAndHarmFactors']

export default class RiskAnalysisController extends BaseController {
  override templatePath = 'risk-analysis'

  override redirectPath = 'defendant-behaviour'

  override formValidation: FormValidation = {
    required: [
      {
        id: 'riskPredictors',
        errorMessage: 'Confirm risk predictors and assess the likelihood of reoffending',
      },
      {
        id: 'riskAndHarmFactors',
        errorMessage: 'Analyse relevant risks of harm and protective factors',
      },
      {
        id: 'riskToChildren',
        errorMessage: 'Select the level of risk to children from OASys',
      },
      {
        id: 'riskToPublic',
        errorMessage: 'Select the level of risk to the public from OASys',
      },
      {
        id: 'riskToKnownAdults',
        errorMessage: 'Select the level of risk to known adults from OASys',
      },
      {
        id: 'riskToStaff',
        errorMessage: 'Select the level of risk to staff from OASys',
      },
    ],
  }

  override pageFields = pageFields
}
