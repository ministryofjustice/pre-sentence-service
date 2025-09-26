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

  function persistForm() {
    if (!window.reportStoreInstance) {
      console.warn('Report store not available, falling back to form data')
      const form = getForm()
      const formData = new URLSearchParams(new FormData(form))
      const reportId = formData.get('reportId')
      const endpoint = `/api/v1/report/${reportId}/save`

      document.dispatchEvent(new CustomEvent('autosave'))

      return fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'x-csrf-token': document.getElementsByName('CSRFToken')[0].value,
        },
      })
    }

    const storeState = window.reportStoreInstance.getState()
    const questions = storeState.questions || {}

    const form = getForm()
    const formData = new URLSearchParams(new FormData(form))
    const reportId = formData.get('reportId')

    const storeFormData = new URLSearchParams()

    for (const [questionId, value] of Object.entries(questions)) {
      if (value !== undefined && value !== null) {
        // Handle arrays (checkbox groups) specially
        if (Array.isArray(value)) {
          // For checkbox groups, if empty array, still send it to clear the field
          if (value.length === 0) {
            storeFormData.append(questionId, '')
          } else {
            value.forEach(v => {
              storeFormData.append(questionId, v)
            })
          }
        } else {
          // For single values, including empty strings for unchecked checkboxes
          storeFormData.append(questionId, value)
        }
      }
    }

    // Add essential form fields that might not be in the store
    // These are typically hidden fields or system fields
    const systemFields = ['reportId', 'CSRFToken', 'crn', 'pnc', 'name', 'dateOfBirth', 'age', 'address']
    systemFields.forEach(fieldName => {
      const fieldValue = formData.get(fieldName)
      if (fieldValue && !storeFormData.has(fieldName)) {
        storeFormData.append(fieldName, fieldValue)
      }
    })

    if (!storeFormData.has('CSRFToken')) {
      storeFormData.append('CSRFToken', document.getElementsByName('CSRFToken')[0].value)
    }

    const endpoint = `/api/v1/report/${reportId}/save`

    document.dispatchEvent(new CustomEvent('autosave'))

    return fetch(endpoint, {
      method: 'POST',
      body: storeFormData,
      headers: {
        'x-csrf-token': document.getElementsByName('CSRFToken')[0].value,
      },
    }).then(response => {
      // Mark changes as saved when successful
      if (response.ok && window.ReportStore) {
        window.ReportStore.markChangesSaved()
      }
      return response
    })
  }

  function addListenersToFormElements() {
    const formElements = getFormElements()

    let timeoutHandle = null

    const handleEvent = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }

      timeoutHandle = setTimeout(() => {
        persistForm()
          .then(response =>
            response.text().then(text => {
              console.log(`Form persisted: ${text}`)
            })
          )
          .catch(e => console.error(`Failed to persist form: ${e.message}`))
      }, 30 * 1000)
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

    const links = document.getElementsByTagName('a')

    const handleLink = link => {
      if (!link.target || link.target === '_self') {
        window.location = link.href
      } else {
        window.open(link.href, link.target)
      }
    }

    for (const link of links) {
      link.addEventListener('click', event => {
        event.preventDefault()
        const hasUnsavedChanges = window.ReportStore ? window.ReportStore.getHasUnsavedChanges() : false

        if (hasUnsavedChanges) {
          return persistForm()
            .then(response =>
              response.text().then(text => {
                console.log(`Form persisted: ${text}`)
                handleLink(link)
              })
            )
            .catch(e => console.error(`Failed to persist form: ${e.message}`))
        } else {
          handleLink(link)
        }
      })
    }

    getForm().addEventListener('submit', () => {
      clearTimeout(timeoutHandle)
      if (window.ReportStore) {
        window.ReportStore.markChangesSaved()
      }
    })

    // Track internal navigation to avoid showing alert for page-to-page navigation
    let isInternalNavigation = false

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
          }, 100)
        }
      }
    })

    // Warn user only when closing tab or navigating to external site
    window.addEventListener('beforeunload', event => {
      const hasUnsavedChanges = window.ReportStore ? window.ReportStore.getHasUnsavedChanges() : false

      if (hasUnsavedChanges && !isInternalNavigation) {
        const message = 'You have unsaved changes that will be lost. Are you sure you want to leave?'
        event.preventDefault()
        event.returnValue = message
        return message
      }
    })
  }

  window.addEventListener('load', () => {
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
