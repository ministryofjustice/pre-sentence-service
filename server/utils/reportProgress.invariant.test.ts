import { getReportProgress } from './reportProgress'

const apiAvailable = (extras: Record<string, unknown> = {}) => ({
  apiDefendantDetailsAvailable: true,
  name: 'Jane',
  dateOfBirth: '1990-01-01',
  'address-postcode': 'SW1A 1AA',
  ...extras,
})

const availableSourcesOfInformation = [{ key: 'cps_summary', value: 'CPS summary', isCustom: false }]

describe('reportProgress invariant: Zod schemas and section completeness agree', () => {
  describe('offenceAnalysis', () => {
    it('is Incomplete when offencesUnderConsideration is empty', () => {
      const progress = getReportProgress(
        apiAvailable({ offencesUnderConsideration: '', offencesPattern: 'pattern' }),
        availableSourcesOfInformation
      )
      expect(progress.offenceAnalysis.status).toBe('Incomplete')
      expect(progress.offenceAnalysis.offencesUnderConsideration).toBe(false)
    })

    it('is Incomplete when previous offences pattern is empty', () => {
      const progress = getReportProgress(
        apiAvailable({ offencesUnderConsideration: 'analysis', offencesPattern: '' }),
        availableSourcesOfInformation
      )
      expect(progress.offenceAnalysis.status).toBe('Incomplete')
      expect(progress.offenceAnalysis.offencesPattern).toBe(false)
    })
  })

  describe('defendantBehaviour', () => {
    it('is Incomplete when assessment empty', () => {
      const progress = getReportProgress(apiAvailable({ defendantBehaviour: '' }), availableSourcesOfInformation)
      expect(progress.defendantBehaviour.status).toBe('Incomplete')
    })

    it('is Completed when assessment present', () => {
      const progress = getReportProgress(
        apiAvailable({ defendantBehaviour: 'some assessment' }),
        availableSourcesOfInformation
      )
      expect(progress.defendantBehaviour.assessment).toBe(true)
    })
  })

  describe('riskAnalysis', () => {
    const allRisks = {
      riskToChildren: 'low',
      riskToPublic: 'low',
      riskToKnownAdults: 'low',
      riskToStaff: 'low',
      riskToPrisoners: 'low',
      riskPredictors: 'predictors text',
      riskAndHarmFactors: 'factors text',
    }

    it.each(['riskToChildren', 'riskToPublic', 'riskToKnownAdults', 'riskToStaff', 'riskToPrisoners'])(
      'is Incomplete when %s is missing',
      riskField => {
        const progress = getReportProgress(
          apiAvailable({ ...allRisks, [riskField]: '' }),
          availableSourcesOfInformation
        )

        expect(progress.riskAnalysis.riskLevels).toBe(false)
      }
    )

    it('is Incomplete when riskPredictors empty', () => {
      const progress = getReportProgress(
        apiAvailable({ ...allRisks, riskPredictors: '' }),
        availableSourcesOfInformation
      )
      expect(progress.riskAnalysis.riskPredictors).toBe(false)
    })

    it('is Completed when all fields populated', () => {
      const progress = getReportProgress(apiAvailable(allRisks), availableSourcesOfInformation)
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
      const progress = getReportProgress(apiAvailable(baseSentencing), availableSourcesOfInformation)
      expect(progress.sentencingProposal.sentenceImpact).toBe(false)
    })

    it('is Incomplete when consideration is "possible" but impact missing', () => {
      const progress = getReportProgress(
        apiAvailable({ ...baseSentencing, custodialSentenceConsideration: 'possible' }),
        availableSourcesOfInformation
      )
      expect(progress.sentencingProposal.sentenceImpact).toBe(false)
    })

    it('is Completed when consideration is "not-threshold"', () => {
      const progress = getReportProgress(
        apiAvailable({ ...baseSentencing, custodialSentenceConsideration: 'not-threshold' }),
        availableSourcesOfInformation
      )
      expect(progress.sentencingProposal.sentenceImpact).toBe(true)
    })

    it('is Completed when consideration "possible" and impact provided', () => {
      const progress = getReportProgress(
        apiAvailable({
          ...baseSentencing,
          custodialSentenceConsideration: 'possible',
          custodialSentenceImpact: 'impact details',
        }),
        availableSourcesOfInformation
      )
      expect(progress.sentencingProposal.status).toBe('Completed')
    })
  })

  describe('sourcesOfInformation', () => {
    it('is Incomplete when no sources selected', () => {
      const progress = getReportProgress(apiAvailable({ sourcesOfInformation: '' }), availableSourcesOfInformation)
      expect(progress.sourcesOfInformation.status).toBe('Incomplete')
    })

    it('is Completed when at least one source present (comma-joined string)', () => {
      const progress = getReportProgress(
        apiAvailable({ sourcesOfInformation: 'cps_summary' }),
        availableSourcesOfInformation
      )
      expect(progress.sourcesOfInformation.status).toBe('Completed')
    })
  })

  describe('signYourReport', () => {
    it('is Incomplete when signedBy missing', () => {
      const progress = getReportProgress(apiAvailable({ signReportName: '' }), availableSourcesOfInformation)
      expect(progress.signYourReport.signedBy).toBe(false)
    })

    it('is Incomplete when professional status missing', () => {
      const progress = getReportProgress(
        apiAvailable({ signReportName: 'Jane', professionalStatus: '' }),
        availableSourcesOfInformation
      )
      expect(progress.signYourReport.professionalStatus).toBe(false)
    })

    it('is Completed when author and professionalStatus are present', () => {
      const progress = getReportProgress(
        apiAvailable({ professionalStatus: 'probation service officer', signReportName: 'Jane' }),
        availableSourcesOfInformation
      )
      expect(progress.signYourReport.status).toBe('Completed')
    })
  })
})
