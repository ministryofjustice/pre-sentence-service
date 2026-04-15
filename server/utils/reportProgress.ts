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
  const defendantDetails = {
    name: hasContent(data.name),
    dateOfBirth: hasContent(data.dateOfBirth),
    address:
      hasContent(data['address-buildingName']) ||
      hasContent(data['address-number']) ||
      hasContent(data['address-streetName']) ||
      hasContent(data['address-town']) ||
      hasContent(data['address-district']) ||
      hasContent(data['address-county']) ||
      hasContent(data['address-postcode']),
  }

  const offenceAnalysis = {
    offencesUnderConsideration:
      hasContent(data.offencesUnderConsideration) || hasContent(data.offenceUnderConsideration),
    offencesPattern:
      hasContent(data.offencesPattern) || hasContent(data.offencePattern) || data.noPreviousOffences === 'true',
  }

  const defendantBehaviour = {
    assessment: hasContent(data.defendantBehaviour) || hasContent(data.behaviourAndLifestyleAssessment),
  }

  const riskAnalysis = {
    riskLevels:
      (hasContent(data.riskToChildren) || hasContent(data.riskOfHarmForChildren)) &&
      (hasContent(data.riskToPublic) || hasContent(data.riskOfHarmForPublic)) &&
      (hasContent(data.riskToKnownAdults) || hasContent(data.riskOfHarmForKnownAdults)) &&
      (hasContent(data.riskToStaff) || hasContent(data.riskOfHarmForStaff)),
    riskPredictors: hasContent(data.riskPredictors) || hasContent(data.riskPredictorsAndLikelihoodOfReoffending),
    riskAndHarmFactors: hasContent(data.riskAndHarmFactors) || hasContent(data.relevantRisksAndProtectiveFactors),
  }

  const sentencingProposal = {
    proposedSentence: hasContent(data.proposedSentence),
    proposedSentenceRationale:
      hasContent(data.proposedSentenceRationale) || hasContent(data.rationaleForProposedSentence),
    alternativeSentencingOptions: hasContent(data.alternativeSentencingOptions),
    sentenceImpact: hasContent(data.sentenceImpact) || hasContent(data.impactOfCustodialSentence),
  }

  const sourcesOfInformation = {
    sources: hasContent(data.sourcesOfInformation),
  }

  const signYourReport = {
    signedBy: hasContent(data.signReportName),
    dangerousnessReport: hasContent(data.isDangerousReport),
    spoName: data.isDangerousReport === 'yes' ? hasContent(data.spoName) : true,
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
