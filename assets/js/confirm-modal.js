document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[data-confirm-submit="true"]')
  const modal = document.getElementById('confirm-modal')

  if (!form || !modal) return

  const confirmBtn = document.getElementById('confirm-submit')
  const cancelBtn = document.getElementById('cancel-submit')

  let allowSubmit = false

  // This validation is a bit of a hack due to the way we SSR and validate server side.
  function hasBlockingValidationErrors() {
    const signReportName = document.getElementById('signReportName')
    const dangerousReport = form.querySelector('input[name="isDangerousReport"]:checked')
    const spoName = document.getElementById('spoName')

    if (!signReportName?.value.trim()) return true
    if (!dangerousReport?.value) return true
    if (dangerousReport.value === 'yes' && !spoName?.value.trim()) return true

    return false
  }

  // This is required when errors are cleared and the page is now valid
  // Without this the errors are still rendered in the background despite the page being valid
  function clearServerValidationUI(form) {
    document
      .querySelectorAll('.govuk-error-summary')
      .forEach(summary => summary.remove())

    form
      .querySelectorAll('.govuk-error-message')
      .forEach(message => message.remove())
    
    form
      .querySelectorAll(
        '.govuk-form-group--error, .govuk-textarea--error, .govuk-input--error'
      )
      .forEach(el => {
        el.classList.remove(
          'govuk-form-group--error',
          'govuk-textarea--error',
          'govuk-input--error'
        )
      })

    form
      .querySelectorAll('[aria-invalid="true"]')
      .forEach(el => {
        el.removeAttribute('aria-invalid')

        const describedBy = el.getAttribute('aria-describedby')
        if (describedBy && describedBy.endsWith('-error')) {
          el.removeAttribute('aria-describedby')
        }
      })
  }

  form.addEventListener('submit', function (e) {
    if (allowSubmit) {
      return
    }

    if (hasBlockingValidationErrors()) {
      return
    }

    e.preventDefault()
    clearServerValidationUI(form)

    modal.hidden = false

    setTimeout(() => {
    document.activeElement.blur()
  }, 0)

  })

  confirmBtn.addEventListener('click', function () {
    allowSubmit = true
    modal.hidden = true
    form.submit()
  })

  cancelBtn.addEventListener('click', function () {
    modal.hidden = true
  })
})
