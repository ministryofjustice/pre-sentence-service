/* eslint-disable node/no-missing-require */
// Wait for zustand and encrypt-storage to load
function waitForLibraries(callback) {
  if ((window.zustand || window.ZustandVanilla || window.createStore) && window.EncryptStorage) {
    callback()
  } else {
    setTimeout(() => waitForLibraries(callback), 50)
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

// Create encrypted storage instance
const createEncryptedStorage = () => {
  // Generate a key based on session/user context for encryption
  const encryptionKey = 'report-store-' + (window.location.hostname || 'localhost')

  // Create encrypted storage instance
  const encryptStorage = new window.EncryptStorage(encryptionKey, {
    storageType: 'sessionStorage',
  })

  return {
    getItem: key => {
      try {
        return encryptStorage.getItem(key)
      } catch (e) {
        console.warn('Failed to decrypt item:', e)
        return null
      }
    },
    setItem: (key, value) => {
      try {
        encryptStorage.setItem(key, value)
      } catch (e) {
        console.warn('Failed to encrypt item:', e)
      }
    },
    removeItem: key => {
      try {
        encryptStorage.removeItem(key)
      } catch (e) {
        console.warn('Failed to remove encrypted item:', e)
      }
    },
  }
}

const createJSONStorage = () => createEncryptedStorage()

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
    if (segments.includes('sources-of-information')) return 'sources-of-information'

    // Fallback to last meaningful segment
    return segments[segments.length - 1] || 'unknown-page'
  }

  const currentPageId = getCurrentPageId()

  function updateStore(inputElement, value) {
    const questionId = inputElement.name || inputElement.id || 'unnamed-input'

    // Check if this is part of a checkbox group
    if (inputElement.type === 'checkbox' && inputElement.name) {
      const checkboxGroup = document.querySelectorAll(`input[type="checkbox"][name="${inputElement.name}"]`)
      if (checkboxGroup.length > 1) {
        // This is a checkbox group - collect all checked values
        const checkedValues = []
        checkboxGroup.forEach(checkbox => {
          if (checkbox.checked) {
            checkedValues.push(checkbox.value)
          }
        })
        reportStore.updateQuestion(questionId, currentPageId, checkedValues)
        reportStore.updatePageSaveState(currentPageId, 'visited')
        markUnsavedChanges()
        return
      }
    }

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
      if (inputType === 'checkbox') {
        eventType = 'change'
        // For single checkboxes with a value, return the value when checked, null when unchecked
        getValue = () => {
          if (element.value && element.value !== 'on') {
            return element.checked ? element.value : ''
          }
          return element.checked
        }
      } else if (inputType === 'radio') {
        eventType = 'change'
        getValue = () => (element.checked ? element.value : null)
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
  }

  // Function to populate form fields from store (store takes precedence)
  function populateFromStore(element) {
    const questionId = element.name || element.id
    if (!questionId) return

    const storeState = reportStore.getState()
    const storeValue = storeState.questions[questionId]

    // Check for valid stored values (including empty arrays)
    // For arrays, we want to process even if empty
    if (storeValue !== undefined) {
      const tagName = element.tagName.toLowerCase()
      const inputType = element.type ? element.type.toLowerCase() : ''

      if (tagName === 'input') {
        if (inputType === 'checkbox') {
          // Check if this is part of a checkbox group
          if (element.name) {
            const checkboxGroup = document.querySelectorAll(`input[type="checkbox"][name="${element.name}"]`)
            if (checkboxGroup.length > 1) {
              // This is a checkbox group - check if value is in array
              if (Array.isArray(storeValue)) {
                const shouldBeChecked = storeValue.includes(element.value)
                element.checked = shouldBeChecked
              } else {
                // Handle case where store has wrong type - treat as empty array
                element.checked = false
              }
              return // Important: return early for checkbox groups
            }
          }
          // Single checkbox - could be boolean or string value
          if (element.value && element.value !== 'on') {
            // Checkbox with a specific value - check if stored value matches
            element.checked = storeValue === element.value
          } else {
            // Standard checkbox - boolean value
            element.checked = Boolean(storeValue)
          }
        } else if (inputType === 'radio') {
          // Radio buttons store the selected value as a string
          element.checked = element.value === String(storeValue)
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
    const storeState = reportStore.getState()

    // Process checkbox groups first to capture their initial DOM state if no stored value
    const checkboxGroups = new Map()
    elements.forEach(element => {
      if (element.type === 'checkbox' && element.name) {
        if (!checkboxGroups.has(element.name)) {
          checkboxGroups.set(element.name, [])
        }
        checkboxGroups.get(element.name).push(element)
      }
    })

    // For each checkbox group, check if we have stored values
    checkboxGroups.forEach((checkboxes, name) => {
      if (checkboxes.length > 1) {
        const storedValue = storeState.questions[name]

        if (storedValue !== undefined) {
          // We have stored values - populate from store
          checkboxes.forEach(checkbox => {
            if (Array.isArray(storedValue)) {
              checkbox.checked = storedValue.includes(checkbox.value)
            }
          })
        } else {
          // No stored values - capture initial DOM state
          const checkedValues = []
          checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
              checkedValues.push(checkbox.value)
            }
          })
          reportStore.updateQuestion(name, currentPageId, checkedValues)
        }
      }
    })

    // Process all other elements
    elements.forEach(element => {
      const inputType = element.type ? element.type.toLowerCase() : ''
      const questionId = element.name || element.id

      // Skip checkbox groups (already handled above)
      if (inputType === 'checkbox' && element.name && checkboxGroups.get(element.name)?.length > 1) {
        // Just bind the event handler
        bindInput(element)
        return
      }

      // For other inputs, check for stored values
      const storedValue = storeState.questions[questionId]

      if (storedValue !== undefined) {
        // Populate from store
        populateFromStore(element)
      } else if (questionId) {
        // No stored value - capture initial DOM state
        let value = null
        if (inputType === 'checkbox') {
          // For checkboxes with a value attribute, store the value when checked
          if (element.value && element.value !== 'on') {
            value = element.checked ? element.value : ''
          } else {
            value = element.checked
          }
        } else if (inputType === 'radio') {
          value = element.checked ? element.value : null
        } else {
          value = element.value
        }

        if (value !== null && value !== '' && value !== false) {
          reportStore.updateQuestion(questionId, currentPageId, value)
        }
      }

      // Bind event handlers
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
  waitForLibraries(() => {
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
