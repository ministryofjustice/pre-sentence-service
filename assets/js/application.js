import { initAll } from 'govuk-frontend-min.js'

if (document.readyState === 'loading') {

  document.addEventListener('DOMContentLoaded', function() {

    initAll()

  })

} else {

  initAll()

}
