document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[data-confirm-submit="true"]')
  const modal = document.getElementById('confirm-modal')

  if (!form || !modal) return

  const confirmBtn = document.getElementById('confirm-submit')
  const cancelBtn = document.getElementById('cancel-submit')

  let allowSubmit = false

  form.addEventListener('submit', function (e) {
    if (allowSubmit) return

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
