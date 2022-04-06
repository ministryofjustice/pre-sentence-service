import { Request } from 'express'
import BaseController from './baseController'
import { FormValidation } from '../../utils/formValidation'

export const pageFields: Array<string> = [
  'assessmentFactors',
  'issueAccommodationDetails',
  'issueEmploymentDetails',
  'issueFinanceDetails',
  'issueRelationshipsDetails',
  'issueSubstanceMisuseDetails',
  'issueHealthDetails',
  'issueBehaviourDetails',
  'issueOtherDetails',
  'experienceOfTrauma',
  'experienceOfTraumaDetails',
  'caringResponsibilities',
  'caringResponsibilitiesDetails',
]

export default class OffenderAssessmentController extends BaseController {
  override templatePath = 'offender-assessment'

  override redirectPath = 'risk-assessment'

  override pageFields = pageFields

  override formValidation: FormValidation = {
    required: [
      {
        id: 'experienceOfTrauma',
        errorMessage: 'Select whether there is evidence of the offender experiencing trauma',
      },
      {
        id: 'caringResponsibilities',
        errorMessage:
          'Select whether the offender has caring responsibilities for children or adults, or have they ever had caring responsibilities for children or adults',
      },
    ],
  }

  override correctFormData = (req: Request): object => {
    const overrides: {
      issueAccommodationDetails?: string
      issueEmploymentDetails?: string
      issueFinanceDetails?: string
      issueRelationshipsDetails?: string
      issueSubstanceMisuseDetails?: string
      issueHealthDetails?: string
      issueBehaviourDetails?: string
      issueOtherDetails?: string
      experienceOfTraumaDetails?: string
      caringResponsibilitiesDetails?: string
    } = {}
    const assessmentFactors: Array<string> = req.body.assessmentFactors ? [].concat(req.body.assessmentFactors) : []
    if (!assessmentFactors || !assessmentFactors.includes('issueAccommodation')) {
      overrides.issueAccommodationDetails = null
    }
    if (!assessmentFactors || !assessmentFactors.includes('issueEmployment')) {
      overrides.issueEmploymentDetails = null
    }
    if (!assessmentFactors || !assessmentFactors.includes('issueFinance')) {
      overrides.issueFinanceDetails = null
    }
    if (!assessmentFactors || !assessmentFactors.includes('issueRelationships')) {
      overrides.issueRelationshipsDetails = null
    }
    if (!assessmentFactors || !assessmentFactors.includes('issueSubstanceMisuse')) {
      overrides.issueSubstanceMisuseDetails = null
    }
    if (!assessmentFactors || !assessmentFactors.includes('issueHealth')) {
      overrides.issueHealthDetails = null
    }
    if (!assessmentFactors || !assessmentFactors.includes('issueBehaviour')) {
      overrides.issueBehaviourDetails = null
    }
    if (!assessmentFactors || !assessmentFactors.includes('issueOther')) {
      overrides.issueOtherDetails = null
    }
    if (!req.body.experienceOfTrauma || req.body.experienceOfTrauma === 'no') {
      overrides.experienceOfTraumaDetails = null
    }
    if (!req.body.caringResponsibilities || req.body.caringResponsibilities === 'no') {
      overrides.caringResponsibilitiesDetails = null
    }
    return overrides
  }
}
