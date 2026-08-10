;(function initialiseCharacterCount() {
  const WARNING_THRESHOLD = 0.9

  function findFields() {
    return document.querySelectorAll('[data-max-length]')
  }

  function counterFor(field) {
    return document.querySelector(`[data-character-count-for="${field.id}"]`)
  }

  function getEditableContent(field) {
    return field.value || ''
  }

  const INVISIBLE_NON_COUNTING_CHARS = /[\u00AD\u034F\u061C\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g

  function normaliseForLength(value) {
    return (value || '')
      .replace(/<p>\s*(?:&nbsp;|&#160;)\s*<\/p>/gi, '') // strip empty CKEditor paragraph fillers
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;|&#160;/gi, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(INVISIBLE_NON_COUNTING_CHARS, '')
  }

  function getLength(field) {
    const text = getEditableContent(field)
    return normaliseForLength(text).length
  }

  function updateCounter(field) {
    const max = parseInt(field.getAttribute('data-max-length'), 10)
    if (!Number.isFinite(max) || max <= 0) return

    const counter = counterFor(field)
    if (!counter) return

    const length = getLength(field)
    const remaining = max - length
    const isAtLimit = length === max
    const isWarning = length >= max * WARNING_THRESHOLD && length <= max
    const isError = length > max

    // Default to hint styling, switch to error only when over limit
    counter.classList.remove('govuk-error-message')
    counter.classList.add('govuk-hint')

    if (!isWarning && !isError) {
      counter.hidden = true
      counter.textContent = ''
    } else if (isError) {
      const overBy = length - max
      counter.hidden = false
      counter.textContent = `You have ${overBy.toLocaleString()} characters too many.`
      counter.classList.remove('govuk-hint')
      counter.classList.add('govuk-error-message')
    } else if (isAtLimit) {
      counter.hidden = false
      counter.textContent = `You have reached the ${max.toLocaleString()} character limit. You cannot save and continue if you enter any more characters.`
    } else {
      counter.hidden = false
      counter.textContent = `You have ${remaining.toLocaleString()} characters remaining.`
    }

    if (window.reportStoreInstance && window.reportStoreInstance.setFieldOverLimit) {
      window.reportStoreInstance.setFieldOverLimit(field.name || field.id, isError)
    }
  }

  function bindField(field) {
    const recheck = () => updateCounter(field)
    const wrapper = field.closest('[data-editor], .govuk-form-group') || field.parentElement

    field.addEventListener('input', recheck)
    field.addEventListener('keyup', recheck)

    if (wrapper) {
      wrapper.addEventListener('input', recheck, true)
      wrapper.addEventListener('keyup', recheck, true)
      wrapper.addEventListener('paste', () => setTimeout(recheck, 0), true)
    }

    let lastLength = getLength(field)
    setInterval(() => {
      const currentLength = getLength(field)
      if (currentLength !== lastLength) {
        lastLength = currentLength
        updateCounter(field)
      }
    }, 300)

    updateCounter(field)
  }

  function init() {
    findFields().forEach(bindField)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
