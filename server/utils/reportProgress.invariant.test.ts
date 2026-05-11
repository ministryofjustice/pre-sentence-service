import { getReportProgress } from './reportProgress'

const apiAvailable = (extras: Record<string, unknown> = {}) => ({
  apiDefendantDetailsAvailable: true,
  name: 'Jane',
  dateOfBirth: '1990-01-01',
  'address-postcode': 'SW1A 1AA',
  ...extras,
})

describe('reportProgress invariant: Zod schemas and section completeness agree', () => {
  describe('offenceAnalysis', () => {
    it('is Incomplete when offencesUnderConsideration is empty', () => {
      const progress = getReportProgress(
        apiAvailable({ offencesUnderConsideration: '', offencesPattern: 'pattern', noPreviousOffences: 'false' })
      )
      expect(progress.offenceAnalysis.status).toBe('Incomplete')
      expect(progress.offenceAnalysis.offencesUnderConsideration).toBe(false)
    })

    it('is Incomplete when both offencesPattern and noPreviousOffences are empty', () => {
      const progress = getReportProgress(
        apiAvailable({ offencesUnderConsideration: 'analysis', offencesPattern: '', noPreviousOffences: '' })
      )
      expect(progress.offenceAnalysis.status).toBe('Incomplete')
      expect(progress.offenceAnalysis.offencesPattern).toBe(false)
    })

    it('is Completed when noPreviousOffences ticked alone', () => {
      const progress = getReportProgress(
        apiAvailable({ offencesUnderConsideration: 'analysis', offencesPattern: '', noPreviousOffences: 'true' })
      )
      expect(progress.offenceAnalysis.status).toBe('Completed')
    })
  })

  describe('defendantBehaviour', () => {
    it('is Incomplete when assessment empty', () => {
      const progress = getReportProgress(apiAvailable({ defendantBehaviour: '' }))
      expect(progress.defendantBehaviour.status).toBe('Incomplete')
    })

    it('is Completed when assessment present', () => {
      const progress = getReportProgress(apiAvailable({ defendantBehaviour: 'some assessment' }))
      expect(progress.defendantBehaviour.assessment).toBe(true)
    })
  })

  describe('riskAnalysis', () => {
    const allRisks = {
      riskToChildren: 'low',
      riskToPublic: 'low',
      riskToKnownAdults: 'low',
      riskToStaff: 'low',
      riskPredictors: 'predictors text',
      riskAndHarmFactors: 'factors text',
    }

    it('is Incomplete when any risk level missing', () => {
      const progress = getReportProgress(apiAvailable({ ...allRisks, riskToChildren: '' }))
      expect(progress.riskAnalysis.riskLevels).toBe(false)
    })

    it('is Incomplete when riskPredictors empty', () => {
      const progress = getReportProgress(apiAvailable({ ...allRisks, riskPredictors: '' }))
      expect(progress.riskAnalysis.riskPredictors).toBe(false)
    })

    it('is Completed when all fields populated', () => {
      const progress = getReportProgress(apiAvailable(allRisks))
      expect(progress.riskAnalysis.status).toBe('Completed')
    })
  })

  describe('sentencingProposal', () => {
    const baseSentencing = {
      proposedSentence: 'sentence',
      proposedSentenceRationale: 'rationale',
      alternativeSentencingOptions: 'alts',
    }

    it('is Incomplete when custodialSentenceConsideration unset', () => {
      const progress = getReportProgress(apiAvailable(baseSentencing))
      expect(progress.sentencingProposal.sentenceImpact).toBe(false)
    })

    it('is Incomplete when consideration is "possible" but impact missing', () => {
      const progress = getReportProgress(
        apiAvailable({ ...baseSentencing, custodialSentenceConsideration: 'possible' })
      )
      expect(progress.sentencingProposal.sentenceImpact).toBe(false)
    })

    it('is Completed when consideration is "not-threshold"', () => {
      const progress = getReportProgress(
        apiAvailable({ ...baseSentencing, custodialSentenceConsideration: 'not-threshold' })
      )
      expect(progress.sentencingProposal.sentenceImpact).toBe(true)
    })

    it('is Completed when consideration "possible" and impact provided', () => {
      const progress = getReportProgress(
        apiAvailable({
          ...baseSentencing,
          custodialSentenceConsideration: 'possible',
          custodialSentenceImpact: 'impact details',
        })
      )
      expect(progress.sentencingProposal.status).toBe('Completed')
    })
  })

  describe('sourcesOfInformation', () => {
    it('is Incomplete when no sources selected', () => {
      const progress = getReportProgress(apiAvailable({ sourcesOfInformation: '' }))
      expect(progress.sourcesOfInformation.status).toBe('Incomplete')
    })

    it('is Completed when at least one source present (comma-joined string)', () => {
      const progress = getReportProgress(apiAvailable({ sourcesOfInformation: 'cps_summary' }))
      expect(progress.sourcesOfInformation.status).toBe('Completed')
    })
  })

  describe('signYourReport', () => {
    it('is Incomplete when signedBy missing', () => {
      const progress = getReportProgress(apiAvailable({ isDangerousReport: 'no' }))
      expect(progress.signYourReport.signedBy).toBe(false)
    })

    it('spoName required only when isDangerousReport is yes', () => {
      const noDanger = getReportProgress(apiAvailable({ signReportName: 'me', isDangerousReport: 'no' }))
      expect(noDanger.signYourReport.spoName).toBe(true)

      const dangerNoSpo = getReportProgress(apiAvailable({ signReportName: 'me', isDangerousReport: 'yes' }))
      expect(dangerNoSpo.signYourReport.spoName).toBe(false)

      const dangerWithSpo = getReportProgress(
        apiAvailable({ signReportName: 'me', isDangerousReport: 'yes', spoName: 'SPO Name' })
      )
      expect(dangerWithSpo.signYourReport.spoName).toBe(true)
    })
  })
})
