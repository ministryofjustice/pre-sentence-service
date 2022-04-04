import BaseController from './baseController'

import { pageFields as offenderDetailsPageFields } from './offenderDetailsController'
import { pageFields as courtDetailsPageFields } from './courtDetailsController'
import { pageFields as offenceDetailsPageFields } from './offenceDetailsController'
import { pageFields as offenceAnalysisPageFields } from './offenceAnalysisController'
import { pageFields as offenderAssessmentPageFields } from './offenderAssessmentController'
import { pageFields as riskAssessmentPageFields } from './riskAssessmentController'
import { pageFields as proposalPageFields } from './proposalController'
import { pageFields as sourcesOfInformationPageFields } from './sourcesOfInformationController'
import { pageFields as signReportPageFields } from './signReportController'

export default class CheckReportController extends BaseController {
  override templatePath = 'check-report'

  override defaultTemplateData = {
    sections: {
      offenderDetails: offenderDetailsPageFields,
      courtDetails: courtDetailsPageFields,
      offenceDetails: offenceDetailsPageFields,
      offenceAnalysis: offenceAnalysisPageFields,
      offenderAssessment: offenderAssessmentPageFields,
      riskAssessment: riskAssessmentPageFields,
      proposal: proposalPageFields,
      sourcesOfInformation: sourcesOfInformationPageFields,
      signReport: signReportPageFields,
    },
  }

  override post = async (): Promise<void> => {
    return null
  }
}
