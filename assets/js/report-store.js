/* eslint-disable node/no-missing-require */
function createSimpleStore(initialState = {}) {
  let state = { ...initialState }
  const listeners = []

  function getState() {
    return state
  }

  function setState(updater) {
    if (typeof updater === 'function') {
      state = updater(state)
    } else {
      state = { ...state, ...updater }
    }

    // Persist to sessionStorage
    try {
      const serialized = JSON.stringify(state)
      sessionStorage.setItem('report-store', serialized)
    } catch (e) {
      console.warn('Could not persist to sessionStorage:', e)
    }

    listeners.forEach(listener => {
      try {
        listener(state)
      } catch (e) {
        console.error('Error in state listener:', e)
      }
    })
  }

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  // Load from sessionStorage on initialization
  try {
    const stored = sessionStorage.getItem('report-store')
    if (stored) {
      const parsedState = JSON.parse(stored)
      state = {
        ...state,
        ...parsedState,
        questions: parsedState.questions || {},
        pageSaveState: parsedState.pageSaveState || {},
        errors: parsedState.errors || [],
      }
    }
  } catch (e) {
    console.warn('Could not load from sessionStorage:', e)
  }

  return {
    getState,
    setState,
    subscribe,
  }
}

const createStore = () => storeConfig => {
  const tempStore = createSimpleStore(defaultInitState)
  const storeApi = storeConfig(tempStore.setState)

  const initialState = {
    ...defaultInitState,
    ...storeApi,
    questions: storeApi.questions || {},
    pageSaveState: storeApi.pageSaveState || {},
    errors: storeApi.errors || [],
  }
  const store = createSimpleStore(initialState)

  return {
    ...store,
    ...storeApi,
  }
}

const persist = storeConfig => storeConfig
const createJSONStorage = () => ({})

const initReportStore = () => {
  return { questions: {}, pageSaveState: {}, errors: [] }
}

const defaultInitState = {
  questions: {},
  pageSaveState: {},
  errors: [],
}

const createReportStore = (initState = defaultInitState) => {
  return createStore()(
    persist(
      set => ({
        ...initState,

        updateQuestion: (id, page, data) =>
          set(state => {
            const newState = { ...state }
            // Ensure questions object exists
            if (!newState.questions) {
              newState.questions = {}
            }
            // Ensure pageSaveState object exists
            if (!newState.pageSaveState) {
              newState.pageSaveState = {}
            }
            newState.questions[id] = data
            newState.pageSaveState[page] = 'visited'
            return newState
          }),
        updatePageSaveState: (page, saveState) =>
          set(state => {
            const newState = { ...state }
            // Ensure pageSaveState object exists
            if (!newState.pageSaveState) {
              newState.pageSaveState = {}
            }
            newState.pageSaveState[page] = saveState
            return newState
          }),
        addError: (pageId, questionId, errorText) =>
          set(state => {
            const newState = { ...state }
            // Ensure errors array exists
            if (!newState.errors) {
              newState.errors = []
            }
            newState.errors.push({ pageId, questionId, errorText })
            return newState
          }),
        removeError: (pageId, questionId) =>
          set(state => {
            const newState = { ...state }
            // Ensure errors array exists
            if (!newState.errors) {
              newState.errors = []
            }

            const removalIndex = newState.errors.findIndex(p => p.pageId === pageId && p.questionId === questionId)

            if (removalIndex >= 0) {
              newState.errors.splice(removalIndex, 1)
            }

            return newState
          }),
      }),
      {
        name: 'report-store',
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
}

// Generic auto-binding system for all form inputs
function initAutoBinding() {
  if (typeof window === 'undefined') return

  const reportStore = createReportStore()

  const getCurrentPageId = () => {
    const path = window.location.pathname
    const segments = path.split('/').filter(Boolean)

    // Look for common page identifiers
    if (segments.includes('offence-analysis')) return 'offence-analysis'
    if (segments.includes('risk-analysis')) return 'risk-analysis'
    if (segments.includes('defendant-behaviour')) return 'defendant-behaviour'

    // Fallback to last meaningful segment
    return segments[segments.length - 1] || 'unknown-page'
  }

  const currentPageId = getCurrentPageId()

  function updateStore(inputElement, value) {
    const questionId = inputElement.name || inputElement.id || 'unnamed-input'

    reportStore.updateQuestion(questionId, currentPageId, value)
    reportStore.updatePageSaveState(currentPageId, 'visited')

    markUnsavedChanges()
  }

  // Function to bind a single input element
  function bindInput(element) {
    const tagName = element.tagName.toLowerCase()
    const inputType = element.type ? element.type.toLowerCase() : ''

    // Determine the appropriate event and value getter
    let eventType = 'input'
    let getValue = () => element.value

    if (tagName === 'input') {
      if (inputType === 'checkbox' || inputType === 'radio') {
        eventType = 'change'
        getValue = () => element.checked
      }
    } else if (tagName === 'select') {
      eventType = 'change'
    } else if (tagName === 'textarea') {
      eventType = 'input'
    }

    // Skip if no id or name (can't identify the input)
    if (!element.id && !element.name) {
      console.warn('Skipping input without id or name:', element)
      return
    }

    // Skip hidden inputs
    if (
      inputType === 'hidden' ||
      element.name === 'CSRFToken' ||
      element.name === 'reportId' ||
      element.name === '_csrf'
    ) {
      return
    }

    element.addEventListener(eventType, function () {
      const value = getValue()
      updateStore(element, value)
    })

    // Initialize with current value if it exists
    const currentValue = getValue()
    if (currentValue !== '' && currentValue !== false) {
      updateStore(element, currentValue)
    }
  }

  // Function to populate form fields from store (store takes precedence)
  function populateFromStore(element) {
    const questionId = element.name || element.id
    if (!questionId) return

    const storeState = reportStore.getState()
    const storeValue = storeState.questions[questionId]

    if (storeValue !== undefined && storeValue !== null) {
      const tagName = element.tagName.toLowerCase()
      const inputType = element.type ? element.type.toLowerCase() : ''

      if (tagName === 'input') {
        if (inputType === 'checkbox' || inputType === 'radio') {
          element.checked = Boolean(storeValue)
        } else {
          element.value = String(storeValue)
        }
      } else if (tagName === 'textarea') {
        element.value = String(storeValue)
      } else if (tagName === 'select') {
        element.value = String(storeValue)
      }
    }
  }

  function bindAllInputs() {
    // Find all relevant form elements
    const selectors = [
      'input[type="text"]',
      'input[type="email"]',
      'input[type="password"]',
      'input[type="number"]',
      'input[type="tel"]',
      'input[type="url"]',
      'input[type="search"]',
      'input[type="date"]',
      'input[type="time"]',
      'input[type="datetime-local"]',
      'input[type="checkbox"]',
      'input[type="radio"]',
      'textarea',
      'select',
    ]

    const elements = document.querySelectorAll(selectors.join(', '))

    elements.forEach(element => {
      // First populate from store (store takes precedence)
      populateFromStore(element)

      // Then bind for future changes
      bindInput(element)
    })

    reportStore.updatePageSaveState(currentPageId, 'visited')
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAllInputs)
  } else {
    bindAllInputs()
  }

  // Return store instance for debugging
  return reportStore
}

let hasUnsavedChanges = false

function markUnsavedChanges() {
  hasUnsavedChanges = true
}

function markChangesSaved() {
  hasUnsavedChanges = false
}

function getHasUnsavedChanges() {
  return hasUnsavedChanges
}

if (typeof window !== 'undefined') {
  window.ReportStore = {
    createReportStore,
    initReportStore,
    defaultInitState,
    initAutoBinding,
    markUnsavedChanges,
    markChangesSaved,
    getHasUnsavedChanges,
  }

  window.reportStoreInstance = initAutoBinding()
}
