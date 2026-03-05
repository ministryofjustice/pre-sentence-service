import { initAll } from './govuk-frontend-bundle.mjs'

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initAll()
  })
} else {
  initAll()
}
