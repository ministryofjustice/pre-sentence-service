import { isOffencesUnderConsiderationComplete, isOffencesPatternComplete } from '../schemas/offence-analysis'
import { isDefendantBehaviourComplete } from '../schemas/defendant-behaviour'
import { isRiskLevelsComplete, isRiskPredictorsComplete, isRiskAndHarmFactorsComplete } from '../schemas/risk-analysis'
import {
  isProposedSentenceComplete,
  isProposedSentenceRationaleComplete,
  isAlternativeSentencingOptionsComplete,
  isSentenceImpactComplete,
} from '../schemas/sentencing-proposal'
import { isSourcesOfInformationComplete } from '../schemas/sources-of-information'
import { isSignedByComplete, isDangerousnessReportComplete, isSpoNameComplete } from '../schemas/sign-your-report'

export type CompletionStatus = 'Completed' | 'Incomplete'

type ReportData = Record<string, unknown>

export interface ReportProgress {
  defendantDetails: {
    status: CompletionStatus
    name: boolean
    dateOfBirth: boolean
    address: boolean
  }
  offenceAnalysis: {
    status: CompletionStatus
    offencesUnderConsideration: boolean
    offencesPattern: boolean
  }
  defendantBehaviour: {
    status: CompletionStatus
    assessment: boolean
  }
  riskAnalysis: {
    status: CompletionStatus
    riskLevels: boolean
    riskPredictors: boolean
    riskAndHarmFactors: boolean
  }
  sentencingProposal: {
    status: CompletionStatus
    proposedSentence: boolean
    proposedSentenceRationale: boolean
    alternativeSentencingOptions: boolean
    sentenceImpact: boolean
  }
  sourcesOfInformation: {
    status: CompletionStatus
    sources: boolean
  }
  signYourReport: {
    status: CompletionStatus
    signedBy: boolean
    dangerousnessReport: boolean
    spoName: boolean
  }
}

export const areReviewSectionsComplete = (progress: ReportProgress): boolean => {
  return (
    progress.defendantDetails.status === 'Completed' &&
    progress.offenceAnalysis.status === 'Completed' &&
    progress.defendantBehaviour.status === 'Completed' &&
    progress.riskAnalysis.status === 'Completed' &&
    progress.sentencingProposal.status === 'Completed' &&
    progress.sourcesOfInformation.status === 'Completed'
  )
}

export const hasContent = (value: unknown): boolean => {
  if (value === null || value === undefined) return false

  if (Array.isArray(value)) {
    return value.length > 0
  }

  if (value instanceof Date) {
    return true
  }

  if (typeof value === 'string') {
    const withoutTags = value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ')
    return withoutTags.trim().length > 0
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return true
  }

  return false
}

const getStatus = (isComplete: boolean): CompletionStatus => (isComplete ? 'Completed' : 'Incomplete')

export const getReportProgress = (data: ReportData): ReportProgress => {
  const apiDefendantAvailable = data.apiDefendantDetailsAvailable === true
  const defendantDetails = {
    name: apiDefendantAvailable && hasContent(data.name),
    dateOfBirth: apiDefendantAvailable && hasContent(data.dateOfBirth),
    address:
      apiDefendantAvailable &&
      (hasContent(data['address-buildingName']) ||
        hasContent(data['address-number']) ||
        hasContent(data['address-streetName']) ||
        hasContent(data['address-town']) ||
        hasContent(data['address-district']) ||
        hasContent(data['address-county']) ||
        hasContent(data['address-postcode'])),
  }

  const offenceAnalysis = {
    offencesUnderConsideration: isOffencesUnderConsiderationComplete(data),
    offencesPattern: isOffencesPatternComplete(data),
  }

  const defendantBehaviour = {
    assessment: isDefendantBehaviourComplete(data),
  }

  const riskAnalysis = {
    riskLevels: isRiskLevelsComplete(data),
    riskPredictors: isRiskPredictorsComplete(data),
    riskAndHarmFactors: isRiskAndHarmFactorsComplete(data),
  }

  const sentencingProposal = {
    proposedSentence: isProposedSentenceComplete(data),
    proposedSentenceRationale: isProposedSentenceRationaleComplete(data),
    alternativeSentencingOptions: isAlternativeSentencingOptionsComplete(data),
    sentenceImpact: isSentenceImpactComplete(data),
  }

  const sourcesOfInformation = {
    sources: isSourcesOfInformationComplete(data),
  }

  const signYourReport = {
    signedBy: isSignedByComplete(data),
    dangerousnessReport: isDangerousnessReportComplete(data),
    spoName: isSpoNameComplete(data),
  }

  return {
    defendantDetails: {
      ...defendantDetails,
      status: getStatus(Object.values(defendantDetails).every(Boolean)),
    },
    offenceAnalysis: {
      ...offenceAnalysis,
      status: getStatus(Object.values(offenceAnalysis).every(Boolean)),
    },
    defendantBehaviour: {
      ...defendantBehaviour,
      status: getStatus(Object.values(defendantBehaviour).every(Boolean)),
    },
    riskAnalysis: {
      ...riskAnalysis,
      status: getStatus(Object.values(riskAnalysis).every(Boolean)),
    },
    sentencingProposal: {
      ...sentencingProposal,
      status: getStatus(Object.values(sentencingProposal).every(Boolean)),
    },
    sourcesOfInformation: {
      ...sourcesOfInformation,
      status: getStatus(Object.values(sourcesOfInformation).every(Boolean)),
    },
    signYourReport: {
      ...signYourReport,
      status: getStatus(Object.values(signYourReport).every(Boolean)),
    },
  }
}
