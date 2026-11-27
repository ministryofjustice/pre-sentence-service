import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'

const mockConfig = {
  nonce: 'test-nonce',
  features: { richTextEditor: true, unlockedSigning: false },
  session: { expiryMinutes: 120, warningMinutes: 2 },
  wproofreader: {
    bundleUrl: 'https://spellcheck.example.com/wscservice/wscbundle/wscbundle.js',
    host: 'spellcheck.example.com',
  },
}

jest.mock('../../config', () => ({
  __esModule: true,
  default: mockConfig,
}))

import nunjucksSetup from '../../utils/nunjucksSetup'

describe('edit-offences.njk', () => {
  let env: nunjucks.Environment

  const render = (data: Record<string, unknown> = {}, formValidation: Record<string, unknown> = { errors: {} }) =>
    env.render('psr/edit-offences.njk', {
      reportId: '123',
      reportPath: 'psr',
      preSentenceType: 'Pre-Sentence Report',
      pageName: 'edit-offences',
      csrfToken: 'test-token',
      nonce: 'test-nonce',
      formValidation,
      data,
    })

  const baseEditOffences = {
    mainOffenceDescription: 'Burglary',
    mainOffenceDate: '2024-01-01',
    mainOffenceCode: '01001',
    additionalOffences: [
      { description: 'Theft', date: '2024-01-02', code: '02001' },
      { description: 'Criminal damage', date: '', code: '' },
    ],
  }

  const baseData = { editOffences: baseEditOffences, offencesAvailable: true }

  beforeEach(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  it('renders the "Edit offences" h1', () => {
    const res = render(baseData)

    expect(res).toContain('Edit offences')
  })

  it('renders the exact guidance copy', () => {
    const res = render(baseData)

    expect(res).toContain('Any edits you make in PSR will not be shown in nDelius.')
  })

  it('does not render autosave markup or the data-autosave attribute', () => {
    const res = render(baseData)

    expect(res).not.toContain('data-autosave')
    expect(res).not.toContain('psr-autosave-status')
    expect(res).not.toContain('data-qa="autosave-status"')
  })

  it('renders the main offence description input named mainOffenceDescription with hidden date and code fields', () => {
    const res = render(baseData)

    expect(res).toContain('name="mainOffenceDescription"')
    expect(res).toContain('name="mainOffenceDate"')
    expect(res).toContain('name="mainOffenceCode"')
    expect(res).toContain('value="Burglary"')
  })

  it('renders one row per additional offence with a Remove button for each', () => {
    const res = render(baseData)

    const descriptionMatches = res.match(/name="additionalOffenceDescription"/g) ?? []
    const removeMatches = res.match(/removeOffence/g) ?? []

    expect(descriptionMatches.length).toBe(2)
    expect(removeMatches.length).toBeGreaterThanOrEqual(2)
    expect(res).toContain('Remove')
    expect(res).toContain('value="Theft"')
    expect(res).toContain('value="Criminal damage"')
  })

  it('gives each Remove button and additional input accessible, distinct context', () => {
    const res = render(baseData)

    expect(res).toContain('Remove<span class="govuk-visually-hidden"> additional offence 1</span>')
    expect(res).toContain('Remove<span class="govuk-visually-hidden"> additional offence 2</span>')
    expect(res).toContain('Additional offence 1')
    expect(res).toContain('Additional offence 2')
  })

  it('renders the "Add another offence" button', () => {
    const res = render(baseData)

    expect(res).toContain('Add another offence')
  })

  it('renders the "Save and continue" button', () => {
    const res = render(baseData)

    expect(res).toContain('Save and continue')
  })

  it('renders a Cancel link to the offence-analysis page', () => {
    const res = render(baseData)

    expect(res).toContain('href="/psr/123/offence-analysis"')
    expect(res).toContain('Cancel')
  })

  it('renders CSRF, reportId and pageName hidden inputs', () => {
    const res = render(baseData)

    expect(res).toContain('name="CSRFToken"')
    expect(res).toContain('name="reportId"')
    expect(res).toContain('name="pageName"')
  })

  it('renders the error summary and inline error when mainOffenceDescription is invalid', () => {
    const res = render(
      { editOffences: { ...baseEditOffences, mainOffenceDescription: '' }, offencesAvailable: true },
      { errors: { mainOffenceDescription: 'You must include a Main Offence' } }
    )

    expect(res).toContain('There is a problem')
    expect(res).toContain('You must include a Main Offence')
    expect(res).toContain('href="#mainOffenceDescription"')
  })

  it('places a nameless default-submit button before any Remove/Add button so Enter maps to save', () => {
    const res = render(baseData)

    const buttonMatches = [...res.matchAll(/<button\b[^>]*>/g)]
    expect(buttonMatches.length).toBeGreaterThan(0)

    const firstButtonTag = buttonMatches[0][0]
    expect(firstButtonTag).not.toMatch(/name=/)
    expect(firstButtonTag).toContain('data-default-submit')

    const firstButtonIndex = res.indexOf(firstButtonTag)
    const removeIndex = res.indexOf('name="removeOffence"')
    const addIndex = res.indexOf('value="addOffence"')
    expect(firstButtonIndex).toBeLessThan(removeIndex)
    expect(firstButtonIndex).toBeLessThan(addIndex)
  })

  it('shows the NDelius warning and omits the offence form when no editOffences snapshot is available', () => {
    const res = render({ offencesAvailable: false })

    expect(res).toContain(
      'Unable to fetch offence details from NDelius. Please refresh the page or check NDelius directly.'
    )
    expect(res).not.toContain('name="mainOffenceDescription"')
    expect(res).not.toContain('name="additionalOffenceDescription"')
  })

  it('still renders the form, not the warning, on an add/remove re-render payload', () => {
    const res = render({
      editOffences: {
        ...baseEditOffences,
        additionalOffences: [...baseEditOffences.additionalOffences, { description: '', date: '', code: '' }],
      },
      offencesAvailable: true,
    })

    expect(res).toContain('name="mainOffenceDescription"')
    expect(res).toContain('Save and continue')
    expect(res).toContain('name="CSRFToken"')
    expect(res).not.toContain(
      'Unable to fetch offence details from NDelius. Please refresh the page or check NDelius directly.'
    )
  })
})
