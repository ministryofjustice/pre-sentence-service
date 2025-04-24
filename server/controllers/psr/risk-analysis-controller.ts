import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = ['pnc']

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
    ],
  }

  override pageFields = pageFields
}
