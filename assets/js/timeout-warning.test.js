/** @jest-environment jsdom */
import TimeoutWarning from './timeout-warning.js'

const BASE_TIME = new Date(2026, 0, 1, 12, 0, 0)
const IDLE_MS = 2 * 60000
const WARNING_MS = 1 * 60000

let warning
let redirectSpy

function buildFixture() {
  document.body.innerHTML = `
    <div class="govuk-modal-dialogue-inert-container">
      <div class="govuk-timeout-warning-fallback govuk-body">fallback</div>
    </div>
    <div class="govuk-timeout-warning"
         data-module="govuk-timeout-warning"
         data-minutes-idle-timeout="2"
         data-minutes-modal-visible="1"
         data-url-redirect="/timed-out"
         data-url-extend="/extend-session"
         data-timer-text="For your security, we will sign you out in">
      <div class="govuk-modal-dialogue govuk-timeout-warning__dialog" data-inert-container=".govuk-modal-dialogue-inert-container">
        <div class="govuk-modal-dialogue__wrapper">
          <dialog class="govuk-modal-dialogue__box" aria-labelledby="timeout-warning-title" aria-modal="true" tabindex="-1">
            <div class="govuk-modal-dialogue__header"></div>
            <div class="govuk-modal-dialogue__content">
              <h2 class="govuk-modal-dialogue__heading govuk-heading-l" id="timeout-warning-title">You are about to be signed out</h2>
              <div class="govuk-modal-dialogue__description govuk-body">
                <div class="govuk-timeout-warning__timer" aria-hidden="true"></div>
                <div class="govuk-timeout-warning__at-timer govuk-visually-hidden" role="status" id="at-timer"></div>
              </div>
              <button type="button" class="govuk-button" data-element="govuk-modal-dialogue-close" data-qa="stay-signed-in">Stay signed in</button>
            </div>
          </dialog>
        </div>
        <div class="govuk-modal-dialogue__backdrop"></div>
      </div>
    </div>`
  return document.querySelector('[data-module="govuk-timeout-warning"]')
}

function createWarning() {
  warning = new TimeoutWarning(buildFixture())
  warning.init()
  return warning
}

function dialogBox() {
  return document.querySelector('dialog.govuk-modal-dialogue__box')
}

function timerText() {
  return document.querySelector('.govuk-timeout-warning__timer').textContent
}

function refocusTab() {
  document.dispatchEvent(new Event('visibilitychange'))
}

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn()
  redirectSpy = jest.spyOn(TimeoutWarning.prototype, 'redirect').mockImplementation(() => {})
})

beforeEach(() => {
  jest.useFakeTimers()
  jest.setSystemTime(BASE_TIME)
  global.fetch = jest.fn().mockResolvedValue({ ok: true })
  redirectSpy.mockClear()
})

afterEach(() => {
  if (warning) {
    warning.clearTimers()
    warning.idleDeadline = null
    warning.warningDeadline = null
    dialogBox().removeAttribute('open')
    warning = null
  }
  jest.clearAllTimers()
  jest.useRealTimers()
})

describe('TimeoutWarning', () => {
  it('opens the warning dialog with the full countdown after the idle period', () => {
    createWarning()

    jest.advanceTimersByTime(IDLE_MS)

    expect(dialogBox().hasAttribute('open')).toBe(true)
    expect(timerText()).toContain('1 minute')
    expect(redirectSpy).not.toHaveBeenCalled()
  })

  it('derives the countdown from the wall clock so it stays accurate after timer throttling', () => {
    createWarning()
    jest.advanceTimersByTime(IDLE_MS)

    jest.setSystemTime(BASE_TIME.getTime() + IDLE_MS + 30000)
    jest.advanceTimersByTime(1000)

    expect(timerText()).toContain('29 seconds')
  })

  it('redirects on tab refocus when the warning deadline passed while hidden', () => {
    createWarning()
    jest.advanceTimersByTime(IDLE_MS)

    jest.setSystemTime(BASE_TIME.getTime() + IDLE_MS + WARNING_MS + 1000)
    refocusTab()

    expect(redirectSpy).toHaveBeenCalled()
  })

  it('opens the dialog with the reduced remainder on tab refocus when only the idle period passed while hidden', () => {
    createWarning()

    jest.setSystemTime(BASE_TIME.getTime() + IDLE_MS + 30000)
    refocusTab()

    expect(dialogBox().hasAttribute('open')).toBe(true)
    expect(timerText()).toContain('30 seconds')
    expect(redirectSpy).not.toHaveBeenCalled()
  })

  it('redirects on tab refocus when the whole idle and warning period passed while hidden', () => {
    createWarning()

    jest.setSystemTime(BASE_TIME.getTime() + IDLE_MS + WARNING_MS + 1000)
    refocusTab()

    expect(redirectSpy).toHaveBeenCalled()
  })

  it('re-arms the idle countdown when the dialog is closed with Escape', () => {
    createWarning()
    jest.advanceTimersByTime(IDLE_MS)

    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
    expect(dialogBox().hasAttribute('open')).toBe(false)

    refocusTab()

    expect(redirectSpy).not.toHaveBeenCalled()
    expect(dialogBox().hasAttribute('open')).toBe(false)
  })

  it('re-arms the idle countdown when the dialog is closed via the back button', () => {
    createWarning()
    jest.advanceTimersByTime(IDLE_MS)

    window.dispatchEvent(new PopStateEvent('popstate'))
    expect(dialogBox().hasAttribute('open')).toBe(false)

    jest.setSystemTime(Date.now() + WARNING_MS + 1000)
    refocusTab()
    expect(redirectSpy).not.toHaveBeenCalled()
    expect(dialogBox().hasAttribute('open')).toBe(false)

    jest.advanceTimersByTime(IDLE_MS)
    expect(dialogBox().hasAttribute('open')).toBe(true)
  })

  it('closes the dialog and extends the session when stay signed in is clicked', () => {
    createWarning()
    jest.advanceTimersByTime(IDLE_MS)
    global.fetch.mockClear()

    document.querySelector('[data-qa="stay-signed-in"]').click()

    expect(dialogBox().hasAttribute('open')).toBe(false)
    expect(global.fetch).toHaveBeenCalledWith('/extend-session', { redirect: 'manual' })
    expect(redirectSpy).not.toHaveBeenCalled()
  })
})
