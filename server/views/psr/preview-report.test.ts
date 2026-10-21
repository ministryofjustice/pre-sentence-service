import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'

jest.mock('../../config', () => ({
  __esModule: true,
  default: {
    nonce: 'test-nonce',
    features: { richTextEditor: true },
    session: { expiryMinutes: 120, warningMinutes: 2 },
    wproofreader: {
      bundleUrl: 'https://spellcheck.example.com/wscservice/wscbundle/wscbundle.js',
      host: 'spellcheck.example.com',
    },
  },
}))

import nunjucksSetup from '../../utils/nunjucksSetup'

const anchorTargets = [
  { page: 'offence-analysis', text: 'Analyse offences under consideration', id: 'offences-under-consideration' },
  {
    page: 'offence-analysis',
    text: 'Analyse previous offending behaviour and response to supervision',
    id: 'previous-offending-behaviour',
  },
  { page: 'risk-analysis', text: 'Risk levels', id: 'risk-levels' },
  {
    page: 'risk-analysis',
    text: 'Confirm risk predictors and assess the immediacy and likelihood of reoffending',
    id: 'assess-reoffending-likelihood',
  },
  {
    page: 'risk-analysis',
    text: 'Analyse relevant risks of harm and protective factors',
    id: 'risks-of-harm',
  },
  { page: 'sentencing-proposal', text: 'Proposed sentence', id: 'proposed-sentence' },
  {
    page: 'sentencing-proposal',
    text: 'Rationale for proposed sentence',
    id: 'proposed-sentence-rationale',
  },
  {
    page: 'sentencing-proposal',
    text: 'Alternative sentencing options',
    id: 'alternative-sentencing-options',
  },
  {
    page: 'sentencing-proposal',
    text: 'Impact of custodial sentence',
    id: 'custodial-sentence-consideration',
  },
]

const reportViewData = {
  name: 'Test Defendant',
  crn: 'X123456',
  reviewSectionsComplete: false,
  versionMismatch: false,
  sectionStatuses: {
    defendantDetails: { name: true, dateOfBirth: true, address: true },
    offenceAnalysis: { offencesUnderConsideration: true, offencesPattern: true },
    defendantBehaviour: { assessment: true },
    riskAnalysis: { riskLevels: true, riskPredictors: true, riskAndHarmFactors: true },
    sentencingProposal: {
      proposedSentence: true,
      proposedSentenceRationale: true,
      alternativeSentencingOptions: true,
      sentenceImpact: true,
    },
    sourcesOfInformation: { sources: true },
  },
  proposedSentence: '',
  proposedSentenceRationale: '',
  alternativeSentencingOptions: '',
  custodialSentenceImpact: '',
  custodialSentenceConsideration: '',
  offencesUnderConsideration: '',
  offencesPattern: '',
  noPreviousOffences: '',
  apiOffencesAvailable: false,
  offencesData: null,
  riskToChildren: '',
  riskToPublic: '',
  riskToKnownAdults: '',
  riskToStaff: '',
  riskPredictors: '',
  riskAndHarmFactors: '',
}

describe('Review your progress section anchors', () => {
  let renderedReviewPage: string
  let renderedDestinationPages: Record<string, string>

  beforeAll(() => {
    // Set up the Express app and Nunjucks environment for rendering templates
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    const env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()

    // Define the anchor targets for the review page
    const sharedContext = {
      reportId: '123',
      reportPath: 'psr',
      preSentenceType: 'Standard PSR',
      pageName: 'review-progress',
      csrfToken: 'test-token',
      nonce: 'test-nonce',
      riskOptions: [],
      formValidation: { errors: {} },
      data: reportViewData,
    }

    renderedReviewPage = env.render('psr/preview-report.njk', sharedContext)
    renderedDestinationPages = Object.fromEntries(
      [...new Set(anchorTargets.map(({ page }) => page))].map(page => [
        page,
        env.render(`psr/${page}.njk`, sharedContext),
      ])
    )
  })

  it.each(anchorTargets)('$text links to a matching destination anchor', ({ page, text, id }) => {
    expect(renderedReviewPage).toContain(`href="/psr/123/${page}#${id}">${text}</a>`)
    expect(renderedDestinationPages[page]).toContain(`id="${id}"`)
  })
})
