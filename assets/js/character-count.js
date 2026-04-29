;(function initialiseCharacterCount() {
  const WARNING_THRESHOLD = 0.9

  function findFields() {
    return document.querySelectorAll('[data-max-length]')
  }

  function counterFor(field) {
    return document.querySelector(`[data-character-count-for="${field.id}"]`)
  }

  function getEditableContent(field) {
    const wrapper = field.closest('[data-editor]') || field.parentElement
    if (wrapper) {
      const editable = wrapper.querySelector('[contenteditable="true"], .ck-editor__editable')
      if (editable) {
        return editable.innerText || editable.textContent || ''
      }
    }
    return field.value || ''
  }

  function getLength(field) {
    return getEditableContent(field).length
  }

  function updateCounter(field) {
    const max = parseInt(field.getAttribute('data-max-length'), 10)
    if (!Number.isFinite(max) || max <= 0) return

    const counter = counterFor(field)
    if (!counter) return

    const length = getLength(field)
    const remaining = max - length
    const isWarning = length >= max * WARNING_THRESHOLD && length < max
    const isError = length > max

    counter.classList.remove('pic-character-count--warning', 'pic-character-count--error')

    if (!isWarning && !isError) {
      counter.hidden = true
      counter.textContent = ''
    } else if (isError) {
      const overBy = length - max
      counter.hidden = false
      counter.textContent = `You have ${overBy.toLocaleString()} character${overBy === 1 ? '' : 's'} too many. You will not be able to save until you reduce this.`
      counter.classList.add('pic-character-count--error')
    } else {
      counter.hidden = false
      counter.textContent = `You have ${remaining.toLocaleString()} character${remaining === 1 ? '' : 's'} remaining. You will not be able to save if you go over ${max.toLocaleString()} characters.`
      counter.classList.add('pic-character-count--warning')
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
