import { sentencingProposalModel } from './sentencing-proposal'

describe('sentencingProposalModel', () => {
  const validBase = {
    proposedSentence: 'Community order',
    proposedSentenceRationale: 'Rationale',
    alternativeSentencingOptions: 'Alternative options',
    custodialSentenceConsideration: 'court-indicated',
    custodialSentenceImpact: '',
  }

  it('accepts a proposed sentence at the 4,000 character limit', () => {
    const result = sentencingProposalModel.safeParse({
      ...validBase,
      proposedSentence: 'a'.repeat(4000),
    })

    expect(result.success).toBe(true)
  })

  it('rejects a proposed sentence over the 4,000 character limit', () => {
    const result = sentencingProposalModel.safeParse({
      ...validBase,
      proposedSentence: 'a'.repeat(4001),
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Proposed sentence must be 4,000 characters or fewer')
    }
  })
})
