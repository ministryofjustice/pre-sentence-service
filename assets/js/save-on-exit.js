;(function initialiseAutosave() {
  const isTypeOf = elementType => element => element.type === elementType

  const isRadio = isTypeOf('radio')
  const isCheckbox = isTypeOf('checkbox')
  const isSelect = element => isTypeOf('select-one')(element) || isTypeOf('select-multiple')(element)

  function getForm() {
    return document.querySelector('form[data-autosave="true"]')
  }

  function getFormElements() {
    return getForm()?.elements
  }

  function hasFormOnPage() {
    return getForm() !== null
  }

  function buildAutosavePayload() {
    const form = getForm()
    if (!form) return null

    const formData = new FormData(form)
    const reportId = formData.get('reportId')
    if (!reportId) return null

    const payload = new URLSearchParams()

    if (window.reportStoreInstance) {
      const storeState = window.reportStoreInstance.getState()
      const questions = storeState.questions || {}

      for (const [questionId, value] of Object.entries(questions)) {
        if (value === undefined || value === null) continue

        if (Array.isArray(value)) {
          if (value.length === 0) {
            payload.append(questionId, '')
          } else {
            value.forEach(item => payload.append(questionId, item))
          }
        } else {
          payload.append(questionId, value)
        }
      }
    } else {
      const fallbackFormData = new URLSearchParams(formData)
      fallbackFormData.forEach((value, key) => {
        payload.append(key, value)
      })
    }

    const systemFields = ['reportId', 'CSRFToken', 'pageName', 'crn', 'pnc', 'name', 'dateOfBirth', 'age', 'address']
    systemFields.forEach(fieldName => {
      const fieldValue = formData.get(fieldName)
      if (fieldValue && !payload.has(fieldName)) {
        payload.append(fieldName, fieldValue)
      }
    })

    if (!payload.has('CSRFToken')) {
      const csrfToken = document.getElementsByName('CSRFToken')[0]?.value
      if (csrfToken) {
        payload.append('CSRFToken', csrfToken)
      }
    }

    return {
      reportId,
      endpoint: `/psr/${reportId}/autosave`,
      payload,
    }
  }

  function persistForm() {
    const autosave = buildAutosavePayload()
    if (!autosave) return Promise.resolve(null)

    document.dispatchEvent(new CustomEvent('autosave'))

    return fetch(autosave.endpoint, {
      method: 'POST',
      body: autosave.payload,
      headers: {
        'x-csrf-token': document.getElementsByName('CSRFToken')[0]?.value,
      },
    }).then(response => {
      if (response.ok && window.ReportStore) {
        window.ReportStore.markChangesSaved()
      }
      return response
    })
  }

  function sendExitAutosaveBeacon() {
    const hasUnsavedChanges = window.ReportStore ? window.ReportStore.getHasUnsavedChanges() : false
    if (!hasUnsavedChanges || !hasFormOnPage()) return

    const autosave = buildAutosavePayload()
    if (!autosave) return

    const csrfToken = document.getElementsByName('CSRFToken')[0]?.value
    if (!csrfToken) return

    const body = new Blob([autosave.payload.toString()], {
      type: 'application/x-www-form-urlencoded;charset=UTF-8',
    })

    // Call sendBeacon to send the autosave data to the server when the user leaves the page.
    if (typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(autosave.endpoint, body)) {
      return
    }

    // Fallback for browsers without sendBeacon support
    fetch(autosave.endpoint, {
      method: 'POST',
      body: autosave.payload,
      keepalive: true,
      headers: {
        'x-csrf-token': csrfToken,
      },
    })
  }

  // Handle sign-out: save before logout
  function handleSignOut(event) {
    const hasUnsavedChanges = window.ReportStore ? window.ReportStore.getHasUnsavedChanges() : false
    const signOutUrl = event.currentTarget?.href || '/sign-out'

    if (!hasUnsavedChanges || !hasFormOnPage()) {
      return true
    }

    event.preventDefault()

    // Attempt save, but always continue logout
    persistForm()
      .then(async response => {
        const text = await response.text()
        if (response.ok) {
          console.log('Sign-out autosave successful')
        } else {
          console.error(`Autosave failed (${response.status}): ${text}`)
        }
      })
      .catch(e => {
        console.error(`Sign-out autosave error: ${e.message}`)
      })
      .finally(() => {
        window.location.assign(signOutUrl)
      })
  }

  function addListenersToFormElements() {
    const formElements = getFormElements()

    let timeoutHandle = null

    const hasOverLimitFields = () => {
      const state = window.reportStoreInstance && window.reportStoreInstance.getState()
      return Boolean(state && state.overLimitFields && state.overLimitFields.length > 0)
    }

    const handleEvent = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }

      timeoutHandle = setTimeout(() => {
        if (hasOverLimitFields()) {
          // Skip autosave while any field exceeds the character limit; dirty flag stays set.
          return
        }

        persistForm()
          .then(async response => {
            const text = await response.text()
            if (!response.ok) {
              throw new Error(`Autosave failed (${response.status}): ${text}`)
            }
            console.log(`Form persisted: ${text}`)
          })
          .catch(e => console.error(`Failed to persist form: ${e.message}`))
      }, 15 * 1000)
    }

    if (window.reportStoreInstance && window.reportStoreInstance.subscribe) {
      window.reportStoreInstance.subscribe(() => {
        handleEvent()
      })
    }

    document.addEventListener('keyup', handleEvent)

    for (const element of formElements) {
      if (isRadio(element) || isCheckbox(element) || isSelect(element)) {
        element.addEventListener('click', handleEvent)
      }
    }

    // Track internal navigation to avoid showing alert for page-to-page navigation
    let isInternalNavigation = false
    // Track form submission to avoid showing alert when submitting the form
    let isFormSubmitting = false

    const form = getForm()
    if (form) {
      form.addEventListener('submit', event => {
        // Check if the event has been prevented by other handlers (eg validation errors)
        if (event.defaultPrevented) return

        console.log('Form submission save initiated')
        isFormSubmitting = true
        if (timeoutHandle) {
          clearTimeout(timeoutHandle)
        }
      })
    }

    document.addEventListener('click', event => {
      const link = event.target.closest('a')
      if (link && link.href) {
        const linkUrl = new URL(link.href, window.location.origin)
        const currentUrl = new URL(window.location.href)

        if (linkUrl.origin === currentUrl.origin) {
          isInternalNavigation = true
          // Reset after a short delay to catch the beforeunload
          setTimeout(() => {
            isInternalNavigation = false
          }, 500)
        }
      }
    })

    // Warn user only when closing tab or navigating to external site
    window.addEventListener('beforeunload', event => {
      const hasUnsavedChanges = window.ReportStore ? window.ReportStore.getHasUnsavedChanges() : false

      if (hasUnsavedChanges && !isInternalNavigation && !isFormSubmitting) {
        const message = 'You have unsaved changes that will be lost. Are you sure you want to leave?'
        event.preventDefault()
        event.returnValue = message
        return message
      }
    })
  }

  // Save form data when the user leaves the page (e.g. closing tab, navigating away)
  window.addEventListener('pagehide', event => {
    if (event.persisted) return
    sendExitAutosaveBeacon()
  })

  window.addEventListener('load', () => {
    // Attach sign-out handler to the sign-out link
    const signOutLink = document.querySelector('a[data-qa="signOut"]')
    if (signOutLink) {
      signOutLink.addEventListener('click', handleSignOut)
    }

    // Initialize autosave only if a form is present on the page
    if (hasFormOnPage()) {
      function initializeAutosave() {
        if (!window.reportStoreInstance) {
          setTimeout(initializeAutosave, 100)
          return
        }

        addListenersToFormElements()
        getForm().setAttribute('data-autosave-enabled', true)
      }

      initializeAutosave()
    }
  })
})()
