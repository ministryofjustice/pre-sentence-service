/** @jest-environment jsdom */

function buildFixture({ withClose = true } = {}) {
  const closeButtonMarkup = withClose
    ? '<button type="button" id="close-modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    : ''

  document.body.innerHTML = `
    <form data-confirm-submit="true">
      <input id="signReportName" value="Officer Name">
      <input type="radio" name="professionalStatus" value="registered probation officer" checked>
      <button type="submit">Submit</button>
    </form>

    <div class="govuk-modal" id="confirm-modal" hidden>
      <div class="govuk-modal__content">
        ${closeButtonMarkup}
        <h2 id="confirm-title">Are you ready to sign your report?</h2>
        <p id="confirm-message">You will not be able to edit your report after submitting.</p>
        <button id="confirm-submit" type="button">Sign</button>
        <button type="button" id="cancel-submit">Cancel</button>
      </div>
    </div>`
}

function loadModule() {
  jest.resetModules()
  require('./confirm-modal.js')
  document.dispatchEvent(new Event('DOMContentLoaded'))
}

function submitViaButton(form, submitter) {
  const event = new Event('submit', { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'submitter', { value: submitter })
  form.dispatchEvent(event)
}

function pressTab({ shiftKey = false } = {}) {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true }))
}

describe('confirm-modal close button', () => {
  let form
  let modal
  let submitButton
  let closeButton

  beforeEach(() => {
    buildFixture()
    form = document.querySelector('form[data-confirm-submit="true"]')
    modal = document.getElementById('confirm-modal')
    submitButton = form.querySelector('button[type="submit"]')
    closeButton = document.getElementById('close-modal')

    loadModule()
  })

  it('opens the modal on submit', () => {
    submitViaButton(form, submitButton)
    expect(modal.hidden).toBe(false)
  })

  it('closes the modal when the close (X) button is clicked, same as cancel', () => {
    submitViaButton(form, submitButton)
    expect(modal.hidden).toBe(false)

    closeButton.click()

    expect(modal.hidden).toBe(true)
  })

  it('returns focus to the submit button after closing via the close (X) button', () => {
    submitViaButton(form, submitButton)
    closeButton.click()

    expect(document.activeElement).toBe(submitButton)
  })
})

describe('confirm-modal focus trap with close (X) button', () => {
  let form
  let submitButton
  let closeButton
  let confirmButton
  let cancelButton
  let modalContent

  beforeEach(() => {
    buildFixture()
    form = document.querySelector('form[data-confirm-submit="true"]')
    submitButton = form.querySelector('button[type="submit"]')
    closeButton = document.getElementById('close-modal')
    confirmButton = document.getElementById('confirm-submit')
    cancelButton = document.getElementById('cancel-submit')
    modalContent = document.querySelector('.govuk-modal__content')
    modalContent.tabIndex = -1

    loadModule()
    submitViaButton(form, submitButton)
  })

  it('wraps shift-Tab from the close (X) button to the cancel button instead of escaping the modal', () => {
    closeButton.focus()
    pressTab({ shiftKey: true })

    expect(document.activeElement).toBe(cancelButton)
  })

  it('wraps shift-Tab from the modal content to the cancel button', () => {
    modalContent.focus()
    pressTab({ shiftKey: true })

    expect(document.activeElement).toBe(cancelButton)
  })

  it('wraps forward Tab from the cancel button to the close (X) button', () => {
    cancelButton.focus()
    pressTab()

    expect(document.activeElement).toBe(closeButton)
  })

  it('leaves shift-Tab from the confirm button to the browser so focus moves naturally to the close (X) button', () => {
    confirmButton.focus()
    pressTab({ shiftKey: true })

    expect(document.activeElement).toBe(confirmButton)
  })
})

describe('confirm-modal focus trap without close (X) button', () => {
  let form
  let submitButton
  let confirmButton
  let cancelButton
  let modalContent

  beforeEach(() => {
    buildFixture({ withClose: false })
    form = document.querySelector('form[data-confirm-submit="true"]')
    submitButton = form.querySelector('button[type="submit"]')
    confirmButton = document.getElementById('confirm-submit')
    cancelButton = document.getElementById('cancel-submit')
    modalContent = document.querySelector('.govuk-modal__content')
    modalContent.tabIndex = -1

    loadModule()
    submitViaButton(form, submitButton)
  })

  it('wraps shift-Tab from the confirm button to the cancel button, as before', () => {
    confirmButton.focus()
    pressTab({ shiftKey: true })

    expect(document.activeElement).toBe(cancelButton)
  })

  it('wraps shift-Tab from the modal content to the cancel button, as before', () => {
    modalContent.focus()
    pressTab({ shiftKey: true })

    expect(document.activeElement).toBe(cancelButton)
  })

  it('wraps forward Tab from the cancel button to the confirm button, as before', () => {
    cancelButton.focus()
    pressTab()

    expect(document.activeElement).toBe(confirmButton)
  })
})
