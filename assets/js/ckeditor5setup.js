document.addEventListener('DOMContentLoaded', () => {
  function plainTextLength(editor) {
    const text = editor.editing.view.getDomRoot()?.innerText || ''
    return text.length
  }

  function enforceEditorMaxLength(editor, maxLength) {
    if (!Number.isFinite(maxLength) || maxLength <= 0) return
    attachHardCharacterCap(editor, maxLength)
  }

  function selectedTextLength(editor) {
    if (!editor || !editor.model || !editor.model.document) return 0
    const selection = editor.model.document.selection
    if (selection.isCollapsed) return 0

    let total = 0
    for (const range of selection.getRanges()) {
      for (const item of range.getItems()) {
        if (item.is('$textProxy')) total += item.data.length
      }
    }
    return total
  }

  function remainingCapacity(editor, maxLength) {
    const current = plainTextLength(editor)
    const selected = selectedTextLength(editor)
    return Math.max(0, maxLength - (current - selected))
  }

  function insertPlainText(editor, text) {
    if (!text) return
    editor.model.change(writer => {
      editor.model.insertContent(writer.createText(text))
    })
  }

  function hideError() {
    var $el = document.querySelector('#pss-version-mismatch')
    $el.classList.add('govuk-!-display-none')
    $el.setAttribute('aria-hidden', 'true')
  }

  function showError() {
    var $el = document.querySelector('#pss-version-mismatch')
    $el.classList.remove('govuk-!-display-none')
    $el.removeAttribute('aria-hidden')
  }

  function attachHardCharacterCap(editor, maxLength) {
    const editable = editor.ui?.view?.editable?.element
    if (!editable) return

    const blockedInsertTypes = new Set([
      'insertText',
      'insertFromPaste',
      'insertFromDrop',
      'insertCompositionText',
    ])

    editable.addEventListener(
      'beforeinput',
      event => {
        if (!blockedInsertTypes.has(event.inputType)) return

        const remaining = remainingCapacity(editor, maxLength)

        if (remaining <= 0) {
          event.preventDefault()
          return
        }

        if (typeof event.data === 'string' && event.data.length > remaining) {
          event.preventDefault()
          insertPlainText(editor, event.data.slice(0, remaining))
        }
      },
      true
    )

    // CKEditor-native clipboard pipeline
    // This is necessary because paste can bypass DOM-level beforeinput in some browsers/paths.
    const clipboard = editor.plugins.get('ClipboardPipeline')

    clipboard.on('inputTransformation', (event, data) => {
      const pasted = data.dataTransfer?.getData('text/plain') || ''

      if (!pasted) return

      const remaining = remainingCapacity(editor, maxLength)

      if (remaining <= 0) {
        event.stop()
        return
      }

      if (pasted.length <= remaining) return

      event.stop()
      insertPlainText(editor, pasted.slice(0, remaining))
    })

    // Keep drop guard for browsers/paths that do not route as expected.
    editable.addEventListener(
      'drop',
      event => {
        const dropped = event.dataTransfer?.getData('text/plain') || ''
        if (!dropped) return

        const remaining = remainingCapacity(editor, maxLength)
        if (dropped.length <= remaining) return

        event.preventDefault()
        if (remaining > 0) {
          insertPlainText(editor, dropped.slice(0, remaining))
        }
      },
      true
    )
  }

  document.querySelectorAll('.moj-side-navigation__item a').forEach(function ($el) {
    $($el).on('click', function (event) {
      const currentPath = window.location.pathname
      const targetLink = event.currentTarget

      if (!targetLink || !targetLink.href) {
        return true
      }

      if (currentPath.indexOf('/sign-your-report') > 0) {
        return true
      }

      const formElement = document.querySelector('form[data-autosave="true"]')

      if (!formElement) {
        return true
      }

      event.preventDefault()
      const form = $(formElement)
      const redirectPath = targetLink.getAttribute('href')
      const targetSegment = redirectPath.substr(redirectPath.lastIndexOf('/') + 1)

      form.attr('action', currentPath + '?redirectPath=' + targetSegment)
      form.submit()
    })
  })

  var Editor = window.ClassicEditor
  if (!Editor && typeof module !== 'undefined' && module.exports) {
    Editor = module.exports
    window.ClassicEditor = Editor
  }
  if (!Editor) {
    console.error('ClassicEditor not available — ckeditor.js did not load')
    return
  }

  var wpCfg = window.wproofreaderConfig || {}
  var wproofreaderLicenceKey = wpCfg.serviceId || ''
  var wproofreaderBundleUrl = wpCfg.bundleUrl || ''
  var baseToolbar = ['bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', '|', 'undo', 'redo', '|', 'removeFormat']

  var targets = new Set()
  document.querySelectorAll('.app-apply-ckeditor5').forEach(function ($el) {
    targets.add($el)
  })
  document.querySelectorAll('textarea').forEach(function ($el) {
    if ($el.hasAttribute('data-no-rich-text')) return
    var rows = parseInt($el.getAttribute('rows'), 10)
    if (rows && rows > 1) targets.add($el)
  })

  targets.forEach(function ($el) {
    $el.classList.add('app-apply-ckeditor5')
    var editorConfig = { toolbar: { items: baseToolbar.slice() } }
    if (wproofreaderLicenceKey && wproofreaderBundleUrl) {
      editorConfig.toolbar.items.push('|', 'wproofreader')
      editorConfig.wproofreader = {
        serviceId: wproofreaderLicenceKey,
        srcUrl: wproofreaderBundleUrl,
        lang: 'en_GB',
        removeBranding: true,
        settingsSections: ['general', 'options'],
      }
    }
    Editor.create($el, editorConfig)
      .then(editor => {
        const maxLength = parseInt($el.getAttribute('data-max-length'), 10)
        enforceEditorMaxLength(editor, maxLength)
      })
      .catch(err => {
        const fieldId = $el.id || $el.getAttribute('name') || '(unknown field)'
        const configuredMaxLength = $el.getAttribute('data-max-length')
        const page = window.location.pathname.split('/').pop() || '(unknown page)'

        console.error('CKEditor initialization failed', {
          fieldId,
          configuredMaxLength,
          page,
          error: err,
        })

        if (wproofreaderLicenceKey) {
          Editor.create($el, { toolbar: { items: baseToolbar.slice() } })
            .then(editor => {
              const maxLength = parseInt($el.getAttribute('data-max-length'), 10)
              enforceEditorMaxLength(editor, maxLength)
            })
            .catch(function (innerErr) {
              console.error(innerErr)
            })
        }
      })
  })
})
