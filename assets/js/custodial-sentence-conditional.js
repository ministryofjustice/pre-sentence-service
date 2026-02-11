// Custodial sentence conditional reveal
;(function () {
  'use strict'

  function initCustodialConditional() {
    const radios = document.querySelectorAll('input[name="custodialSentenceConsideration"]')
    const conditionalContent = document.getElementById('custodial-conditional-content')

    if (!radios.length || !conditionalContent) {
      return
    }

    function updateConditionalVisibility() {
      const possibleRadio = document.getElementById('custodial-sentence-possible')

      if (possibleRadio && possibleRadio.checked) {
        conditionalContent.classList.remove('govuk-!-display-none')
        conditionalContent.setAttribute('aria-hidden', 'false')
      } else {
        conditionalContent.classList.add('govuk-!-display-none')
        conditionalContent.setAttribute('aria-hidden', 'true')
      }
    }

    // Add change listeners to all radio buttons
    radios.forEach(function (radio) {
      radio.addEventListener('change', updateConditionalVisibility)
    })

    // Set initial state on page load
    updateConditionalVisibility()
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustodialConditional)
  } else {
    initCustodialConditional()
  }
})()
