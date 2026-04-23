import { areReviewSectionsComplete, getReportProgress, hasContent } from './reportProgress'

describe('reportProgress', () => {
  describe('hasContent', () => {
    it('returns false for empty rich text', () => {
      expect(hasContent('<p>&nbsp;</p>')).toBe(false)
    })

    it('returns true for populated values', () => {
      expect(hasContent('Some text')).toBe(true)
      expect(hasContent(['source'])).toBe(true)
    })
  })

  it('derives completed statuses from API defendant details and saved answers', () => {
    const progress = getReportProgress({
      apiDefendantDetailsAvailable: true,
      name: 'Jane Doe',
      dateOfBirth: '1990-01-01',
      'address-postcode': 'SW1A 1AA',
      offencesUnderConsideration: 'Details',
      noPreviousOffences: 'true',
      defendantBehaviour: 'Assessment',
      riskToChildren: 'low',
      riskToPublic: 'medium',
      riskToKnownAdults: 'low',
      riskToStaff: 'low',
      riskPredictors: 'Predictors',
      riskAndHarmFactors: 'Factors',
      proposedSentence: 'Community order',
      proposedSentenceRationale: 'Rationale',
      alternativeSentencingOptions: 'Alternatives',
      sentenceImpact: 'Impact',
      sourcesOfInformation: 'cps_summary',
      signReportName: 'Officer Name',
      isDangerousReport: 'no',
    })

    expect(progress.defendantDetails.status).toBe('Completed')
    expect(progress.offenceAnalysis.status).toBe('Completed')
    expect(progress.defendantBehaviour.status).toBe('Completed')
    expect(progress.riskAnalysis.status).toBe('Completed')
    expect(progress.sentencingProposal.status).toBe('Completed')
    expect(progress.sourcesOfInformation.status).toBe('Completed')
    expect(progress.signYourReport.status).toBe('Completed')
    expect(areReviewSectionsComplete(progress)).toBe(true)
  })

  it('keeps defendant details incomplete when the API response is unavailable', () => {
    const progress = getReportProgress({
      apiDefendantDetailsAvailable: false,
      name: 'Jane Doe',
      dateOfBirth: '1990-01-01',
      'address-postcode': 'SW1A 1AA',
    })

    expect(progress.defendantDetails.status).toBe('Incomplete')
    expect(progress.defendantDetails.name).toBe(false)
    expect(progress.defendantDetails.dateOfBirth).toBe(false)
    expect(progress.defendantDetails.address).toBe(false)
  })

  it('keeps sections incomplete when required answers are missing', () => {
    const progress = getReportProgress({
      apiDefendantDetailsAvailable: true,
      name: 'Jane Doe',
      isDangerousReport: 'yes',
    })

    expect(progress.defendantDetails.status).toBe('Incomplete')
    expect(progress.riskAnalysis.status).toBe('Incomplete')
    expect(progress.signYourReport.status).toBe('Incomplete')
    expect(progress.signYourReport.spoName).toBe(false)
    expect(areReviewSectionsComplete(progress)).toBe(false)
  })

  it('marks custodial sentence impact as complete when a non-custodial option is selected', () => {
    const progress = getReportProgress({
      proposedSentence: 'Community order',
      proposedSentenceRationale: 'Rationale',
      alternativeSentencingOptions: 'Alternatives',
      custodialSentenceConsideration: 'not-threshold',
    })

    expect(progress.sentencingProposal.sentenceImpact).toBe(true)
    expect(progress.sentencingProposal.status).toBe('Completed')
  })

  it('keeps custodial sentence impact incomplete when custodial is possible but no explanation is entered', () => {
    const progress = getReportProgress({
      proposedSentence: 'Community order',
      proposedSentenceRationale: 'Rationale',
      alternativeSentencingOptions: 'Alternatives',
      custodialSentenceConsideration: 'possible',
      custodialSentenceImpact: '   ',
    })

    expect(progress.sentencingProposal.sentenceImpact).toBe(false)
    expect(progress.sentencingProposal.status).toBe('Incomplete')
  })
})
