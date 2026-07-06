;(function initialiseAutosave() {
  // ---- UTILITIES ---- 

  const isTypeOf = elementType => element => element.type === elementType
  const isRadio = isTypeOf('radio')
  const isCheckbox = isTypeOf('checkbox')
  const isSelect = element => isTypeOf('select-one')(element) || isTypeOf('select-multiple')(element)

  // ---- DOM HELPERS ---- 

  function getForm() {
    return document.querySelector('form[data-autosave="true"]')
  }

  function getFormElements() {
    return getForm()?.elements
  }

  function hasFormOnPage() {
    return getForm() !== null
  }

  function getCsrfToken() {
    return document.getElementsByName('CSRFToken')[0]?.value || ''
  }

  // ---- PAYLOAD BUILDER ---- 

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
      const csrfToken = getCsrfToken()
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

  // ---- SAVE FUNCTIONS ---- 

  function persistForm() {
    const autosave = buildAutosavePayload()
    if (!autosave) return Promise.resolve(null)

    document.dispatchEvent(new CustomEvent('autosave'))

    return fetch(autosave.endpoint, {
      method: 'POST',
      body: autosave.payload,
      headers: {
        'x-csrf-token': getCsrfToken(),
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

    const csrfToken = getCsrfToken()
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

  // ---- EVENT HANDLERS/STATE ---- 

  const AUTOSAVE_DEBOUNCE_MS = 15 * 1000
  const INTERNAL_NAV_RESET_MS = 500
  const STORE_READY_RETRY_MS = 100

  let isInternalNavigation = false
  let isFormSubmitting = false
  let timeoutHandle = null

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

  function onBeforeUnload(event) {
    const hasUnsavedChanges = window.ReportStore ? window.ReportStore.getHasUnsavedChanges() : false

    if (hasUnsavedChanges && !isInternalNavigation && !isFormSubmitting) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

  const isAnyFieldOverLimit = () => {
    const state = window.reportStoreInstance && window.reportStoreInstance.getState()
    return Boolean(state && state.overLimitFields && state.overLimitFields.length > 0)
  }
  
  const queueAutosave = () => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
    }

    timeoutHandle = setTimeout(() => {
      if (isAnyFieldOverLimit()) {
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
    }, AUTOSAVE_DEBOUNCE_MS)
  }

  // ---- LISTENER REGISTRATION ----

  function wireAutosaveInputs(formElements) {
    if (window.reportStoreInstance && window.reportStoreInstance.subscribe) {
      window.reportStoreInstance.subscribe(() => {
        queueAutosave()
      })
    }

    document.addEventListener('keyup', queueAutosave)

    for (const element of formElements) {
      if (isRadio(element) || isCheckbox(element) || isSelect(element)) {
        element.addEventListener('click', queueAutosave)
      }
    }
  }

  // Side-nav must submit the current form with redirectPath so page changes..
  // ..persist even when rich-text scripts are disabled
  function wireSideNavSubmit() {
    document.querySelectorAll('.moj-side-navigation__item a').forEach(link => {
      link.addEventListener('click', event => {
        const targetLink = event.currentTarget

        if (!(targetLink instanceof HTMLAnchorElement) || !targetLink.href) {
          return
        }

        const formElement = getForm()
        if (!formElement) {
          return
        }

        const targetUrl = new URL(targetLink.href, window.location.origin)
        if (targetUrl.origin !== window.location.origin) {
          return
        }

        const targetSegment = targetUrl.pathname.split('/').filter(Boolean).pop()
        if (!targetSegment) {
          return
        }

        event.preventDefault()

        if (timeoutHandle) {
          clearTimeout(timeoutHandle)
        }
        isFormSubmitting = true

        formElement.setAttribute('action', window.location.pathname + '?redirectPath=' + encodeURIComponent(targetSegment))
        formElement.submit()
      })
    })
  }

  function wireSubmitState(form) {
    if (!form) return

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

  function wireInternalNavState() {
    document.addEventListener('click', event => {
      const link = event.target.closest('a')
      if (!link || !link.href) return

      const linkUrl = new URL(link.href, window.location.origin)
      const currentUrl = new URL(window.location.href)

      if (linkUrl.origin === currentUrl.origin) {
        isInternalNavigation = true
        // Reset after a short delay to catch the beforeunload
        setTimeout(() => {
          isInternalNavigation = false
        }, INTERNAL_NAV_RESET_MS)
      }
    })
  }

  function wireLeaveWarning() {
    window.addEventListener('beforeunload', onBeforeUnload)
  }

  function initialiseAutosaveListeners() {
    const formElements = getFormElements()
    const form = getForm()

    wireAutosaveInputs(formElements)
    wireSubmitState(form)
    wireSideNavSubmit()
    wireInternalNavState()
    wireLeaveWarning()
  }

  function startAutosaveWhenStoreReady() {
    if (!window.reportStoreInstance) {
      setTimeout(startAutosaveWhenStoreReady, STORE_READY_RETRY_MS)
      return
    }

    initialiseAutosaveListeners()
    getForm().setAttribute('data-autosave-enabled', true)
  }

  // ---- INITIALISATION HOOKS ----

  // Save form data when the user leaves the page
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
      startAutosaveWhenStoreReady()
    }
  })
})()
