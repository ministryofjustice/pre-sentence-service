import { initAll } from './govuk-frontend-bundle.mjs'
import TimeoutWarning from './timeout-warning.js'
import './confirm-modal.js'

function init() {
  initAll()

  const $timeoutWarning = document.querySelector('[data-module="govuk-timeout-warning"]')
  if ($timeoutWarning) {
    new TimeoutWarning($timeoutWarning).init()
  }
}

if (document.readyState === 'loading') {

  document.addEventListener('DOMContentLoaded', function() {

    init()
  })
} else {
  init()
}
