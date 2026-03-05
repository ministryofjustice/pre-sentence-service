import { initAll } from './govuk-frontend-bundle.mjs'
import './confirm-modal.js'

if (document.readyState === 'loading') {

  document.addEventListener('DOMContentLoaded', function() {

    initAll()
  })
} else {
  initAll()
}
