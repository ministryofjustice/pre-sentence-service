import { FormValidation } from '../../utils/formValidation'
import BaseController from './baseController'

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern', 'noPreviousOffences']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'risk-analysis'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'offencesUnderConsideration',
        errorMessage: 'Analyse the offences under consideration',
      },
      {
        id: 'offencesPattern',
        errorMessage: 'Analyse the pattern of offending and response to supervision',
      },
      {
        id: 'noPreviousOffences',
        errorMessage: 'Check the box if the defendant has no previous offences or experience of supervision',
      },
    ],
  }
}
