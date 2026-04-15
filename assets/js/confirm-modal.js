document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[data-confirm-submit="true"]')
  const modal = document.getElementById('confirm-modal')

  if (!form || !modal) return

  const confirmBtn = document.getElementById('confirm-submit')
  const cancelBtn = document.getElementById('cancel-submit')

  let allowSubmit = false

  function hasBlockingValidationErrors() {
    const signReportName = document.getElementById('signReportName')
    const dangerousReport = form.querySelector('input[name="isDangerousReport"]:checked')
    const spoName = document.getElementById('spoName')

    if (!signReportName?.value.trim()) return true
    if (!dangerousReport?.value) return true
    if (dangerousReport.value === 'yes' && !spoName?.value.trim()) return true

    return false
  }

  form.addEventListener('submit', function (e) {
    if (allowSubmit) return
    if (hasBlockingValidationErrors()) return

    e.preventDefault()
    modal.hidden = false
    confirmBtn.focus()
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
