export function sentences(n: number): string {
  return Array(n).fill('The defendant shows a pattern of behaviour relevant to this assessment.').join(' ')
}

export function buildReportData(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    name: 'Test Defendant',
    dateOfBirth: new Date(1990, 0, 15),
    ageInYears: 36,
    address: {
      buildingName: 'Test House',
      addressNumber: '1',
      streetName: 'Test Street',
      town: 'Testtown',
      district: 'Testshire',
      county: 'Testland',
      postcode: 'TE1 1ST',
    },
    offenceData: {
      mainOffence: { subCategory: { description: 'Test main offence' }, date: '01/01/2026' },
      additionalOffences: [],
    },
    offencesUnderConsideration: `TOKEN_OFFENCES_ANALYSIS ${sentences(3)}`,
    noPreviousOffences: 'false',
    offencesPattern: `TOKEN_OFFENCES_PATTERN ${sentences(3)}`,
    defendantBehaviour: `TOKEN_BEHAVIOUR ${sentences(3)}`,
    riskToChildren: 'Low',
    riskToPublic: 'Medium TOKEN_ROSH',
    riskToKnownAdults: 'Low',
    riskToStaff: 'Low',
    riskPredictors: `TOKEN_PREDICTORS ${sentences(3)}`,
    riskAndHarmFactors: `TOKEN_HARM_FACTORS ${sentences(3)}`,
    proposedSentence: `TOKEN_PROPSTART ${sentences(3)} TOKEN_PROPEND`,
    proposedSentenceRationale: `TOKEN_RATIONALE ${sentences(3)}`,
    alternativeSentencingOptions: `TOKEN_ALTERNATIVES ${sentences(3)}`,
    custodialSentenceConsideration: 'possible',
    impactExplanation: `TOKEN_IMPACT ${sentences(3)}`,
    custodialSentenceImpact: `TOKEN_CUSTODIAL_IMPACT ${sentences(3)}`,
    isDangerousReport: 'no',
    signReportName: 'TOKEN_AUTHOR Report Author',
    reportSubmittedAt: '01/07/2026',
    ...overrides,
  }
}

export function unbrokenString(n: number, alphabet = 'abcdefghij0123456789'): string {
  return alphabet.repeat(Math.ceil(n / alphabet.length)).slice(0, n)
}

export function pageFittingProposal(): string {
  const body = sentences(30)
  return `TOKEN_PROPSTART ${body}`.slice(0, 1980) + ' TOKEN_PROPEND'
}
