/* eslint-disable node/no-missing-require */
// Wait for zustand to load and use vanilla API
function waitForZustand(callback) {
  if (window.zustand || window.ZustandVanilla || window.createStore) {
    callback()
  } else {
    setTimeout(() => waitForZustand(callback), 50)
  }
}

let zustandCreateStore

const persist = (config, options) => (set, get, api) => {
  const { name, storage = sessionStorage } = options

  // Load initial state from storage
  let initialState = {}
  try {
    const stored = storage.getItem(name)
    if (stored) {
      initialState = JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Could not load from storage:', e)
  }

  const configResult = config(
    (...args) => {
      set(...args)
      // Persist after each state change
      try {
        const state = get()
        storage.setItem(name, JSON.stringify(state))
      } catch (e) {
        console.warn('Could not persist to storage:', e)
      }
    },
    get,
    api
  )

  const mergedState = {
    ...configResult,
    ...initialState,
    questions: { ...configResult.questions, ...initialState.questions },
    pageSaveState: { ...configResult.pageSaveState, ...initialState.pageSaveState },
    errors: [...(configResult.errors || []), ...(initialState.errors || [])],
  }

  set(mergedState, true)

  return mergedState
}

const createJSONStorage = () => sessionStorage

const initReportStore = () => {
  return { questions: {}, pageSaveState: {}, errors: [] }
}

const defaultInitState = {
  questions: {},
  pageSaveState: {},
  errors: [],
}

const createReportStore = (initState = defaultInitState) => {
  if (!zustandCreateStore) {
    zustandCreateStore = window.createStore || window.zustand
  }

  const store = zustandCreateStore(
    persist(
      set => ({
        ...initState,

        updateQuestion: (id, page, data) =>
          set(state => {
            const newState = { ...state }
            if (!newState.questions) {
              newState.questions = {}
            }
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
            if (!newState.pageSaveState) {
              newState.pageSaveState = {}
            }
            newState.pageSaveState[page] = saveState
            return newState
          }),
        addError: (pageId, questionId, errorText) =>
          set(state => {
            const newState = { ...state }
            if (!newState.errors) {
              newState.errors = []
            }
            newState.errors.push({ pageId, questionId, errorText })
            return newState
          }),
        removeError: (pageId, questionId) =>
          set(state => {
            const newState = { ...state }
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
        storage: createJSONStorage(),
      }
    )
  )

  // Create wrapper that exposes methods at top level for compatibility
  return {
    getState: store.getState,
    setState: store.setState,
    subscribe: store.subscribe,
    updateQuestion: (id, page, data) => store.getState().updateQuestion(id, page, data),
    updatePageSaveState: (page, saveState) => store.getState().updatePageSaveState(page, saveState),
    addError: (pageId, questionId, errorText) => store.getState().addError(pageId, questionId, errorText),
    removeError: (pageId, questionId) => store.getState().removeError(pageId, questionId),
  }
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
      populateFromStore(element)
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
  waitForZustand(() => {
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
  })
}
