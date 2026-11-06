/** @jest-environment jsdom */
import AutosaveStatus from './autosave-status.js'

function buildFixture() {
  document.body.innerHTML = `
    <div class="psr-autosave-status" data-module="psr-autosave-status">
      <p class="govuk-body" data-qa="autosave-status">This page was last saved at <span data-autosave-time>14:01</span></p>
      <div class="psr-connection-banner psr-connection-banner--error" data-connection-error tabindex="-1" role="alert" hidden>
        <p class="govuk-body"><strong>There is a problem with the connection.</strong> Your changes will be saved when it is restored.</p>
      </div>
      <div class="psr-connection-banner psr-connection-banner--success" data-connection-restored role="status" hidden>
        <p class="govuk-body"><strong>The connection has been restored.</strong></p>
      </div>
    </div>`
  return document.querySelector('[data-module="psr-autosave-status"]')
}

let status
let errorBanner
let successBanner

beforeEach(() => {
  status = new AutosaveStatus(buildFixture())
  errorBanner = document.querySelector('[data-connection-error]')
  successBanner = document.querySelector('[data-connection-restored]')
})

describe('updateTimestamp', () => {
  it('displays the save time as 24-hour HH:MM', () => {
    status.updateTimestamp(new Date(2026, 0, 15, 16, 7))
    expect(document.querySelector('[data-autosave-time]').textContent).toBe('16:07')
  })

  it('pads single-digit hours', () => {
    status.updateTimestamp(new Date(2026, 0, 15, 9, 5))
    expect(document.querySelector('[data-autosave-time]').textContent).toBe('09:05')
  })
})

describe('showConnectionError', () => {
  it('reveals the red banner and hides the green banner', () => {
    status.showConnectionError()
    expect(errorBanner.hidden).toBe(false)
    expect(successBanner.hidden).toBe(true)
  })

  it('moves focus to the banner on the first failure', () => {
    status.showConnectionError()
    expect(document.activeElement).toBe(errorBanner)
  })

  it('does not move focus on subsequent failures', () => {
    status.showConnectionError()
    status.showConnectionRestored()
    document.body.setAttribute('tabindex', '-1')
    document.body.focus()
    status.showConnectionError()
    expect(document.activeElement).toBe(document.body)
  })
})

describe('showConnectionRestored', () => {
  it('replaces the red banner with the green banner', () => {
    status.showConnectionError()
    status.showConnectionRestored()
    expect(errorBanner.hidden).toBe(true)
    expect(successBanner.hidden).toBe(false)
  })

  it('does not change focus', () => {
    status.showConnectionError()
    document.body.setAttribute('tabindex', '-1')
    document.body.focus()
    status.showConnectionRestored()
    expect(document.activeElement).toBe(document.body)
  })

  it('does nothing when no connection failure has occurred', () => {
    status.showConnectionRestored()
    expect(successBanner.hidden).toBe(true)
    expect(errorBanner.hidden).toBe(true)
  })

  it('keeps the green banner visible after further successful saves', () => {
    status.showConnectionError()
    status.showConnectionRestored()
    status.showConnectionRestored()
    expect(successBanner.hidden).toBe(false)
  })
})

describe('hasConnectionFailed', () => {
  it('is false before any failure', () => {
    expect(status.hasConnectionFailed()).toBe(false)
  })

  it('is true after a failure and remains true after restore', () => {
    status.showConnectionError()
    expect(status.hasConnectionFailed()).toBe(true)
    status.showConnectionRestored()
    expect(status.hasConnectionFailed()).toBe(true)
  })
})
