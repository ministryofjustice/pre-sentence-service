document.addEventListener('DOMContentLoaded', () => {
  const NEWLINE_LIKE_CHARS = /\r\n|[\r\n\u2028\u2029]/g
  const INVISIBLE_NON_COUNTING_CHARS = /[\u00AD\u034F\u061C\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g

  function normaliseForLength(value) {
    return (value || '')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;|&#160;/gi, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(NEWLINE_LIKE_CHARS, '') // Remove newlines, including Unicode line/paragraph separators
      .replace(INVISIBLE_NON_COUNTING_CHARS, '') // Remove zero-width characters
  }

  function normaliseIncomingPlainText(value) {
    return (value || '')
      .replace(/\r\n?/g, '\n')
      .replace(/[\u2028\u2029]/g, '\n')
      .replace(INVISIBLE_NON_COUNTING_CHARS, '')
  }

  function incomingCount(text) {
    return normaliseForLength(normaliseIncomingPlainText(text)).length
  }

  function plainTextLength(editor) {
    const text = editor.editing.view.getDomRoot()?.innerText || ''
    return normaliseForLength(text).trim().length
  }

  function enforceEditorMaxLength(editor, maxLength) {
    if (!Number.isFinite(maxLength) || maxLength <= 0) return
    attachHardCharacterCap(editor, maxLength)
  }

  function selectedTextLength(editor) {
    if (!editor || !editor.model || !editor.model.document) return 0

    const selection = editor.model.document.selection
    if (selection.isCollapsed) return 0

    let selected = ''
    for (const range of selection.getRanges()) {
      for (const item of range.getItems()) {
        if (item.is('$textProxy')) selected += item.data
      }
    }

    return normaliseForLength(selected).length
  }

  function truncateToRemaining(rawText, remaining) {
    if (!rawText || remaining <= 0) return ''

    const input = normaliseIncomingPlainText(rawText)
    let allowed = remaining
    let out = ''

    for (let i = 0; i < input.length; i += 1) {
      const ch = input[i]

      if (ch === '\n') {
        out += ch
        continue
      }

      if (allowed <= 0) break
      out += ch
      allowed -= 1
    }

    return out
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

  function debounce(fn, ms) {
    var t = null
    return function () {
      var args = arguments
      var ctx = this
      if (t) clearTimeout(t)
      t = setTimeout(function () {
        fn.apply(ctx, args)
      }, ms)
    }
  }

  function wireEditorToStore($el, editor) {
    var questionId = $el.id || $el.getAttribute('name')
    if (!questionId) return

    var initialData = editor.getData()
    var lastPushed = initialData

    var push = debounce(function () {
      var data = editor.getData()
      if (data === lastPushed) return
      lastPushed = data
      var store = window.reportStoreInstance
      if (store && typeof store.pushFromEditor === 'function') {
        store.pushFromEditor(questionId, data)
      }
    }, 250)

    editor.model.document.on('change:data', function () {
      push()
    })
  }

  function forcePastePlainText(editor) {
    editor.editing.view.document.on(
      'clipboardInput',
      function (evt, data) {
        var text = data.dataTransfer.getData('text/plain') || ''
        if (!text) {
          return
        }
        var escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        // convert each \n into a  <br>
        var html = escaped.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>')
        html = '<p>' + html + '</p>'
        data.content = editor.data.processor.toView(html)
      },
      { priority: 'high' }
    )
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

        if (typeof event.data === 'string' && incomingCount(event.data) > remaining) {
          event.preventDefault()
        }
      },
      true
    )

    // CKEditor-native clipboard pipeline
    // Prevents paste from bypassing DOM-level beforeinput in some browsers/paths.
    const clipboard = editor.plugins.get('ClipboardPipeline')
    if (!clipboard) return

    // Always flatten pasted content to plain text (formatting removed on paste)
    clipboard.on('inputTransformation', (event, data) => {
      // Stop default CKEditor insertion first, even when text/plain is empty.
      event.stop()

      const pastedRaw = data.dataTransfer?.getData('text/plain') || ''
      if (!pastedRaw) return

      const remaining = remainingCapacity(editor, maxLength)
      if (remaining <= 0) return

      const toInsert = truncateToRemaining(pastedRaw, remaining)
      if (!toInsert) return

      insertPlainText(editor, toInsert)
    })

    // Always flatten dropped content to plain text (formatting removed on drop)
    editable.addEventListener(
      'drop',
      event => {
        // Intercept all drops on the editable so HTML never gets inserted by default handlers.
        event.preventDefault()
        event.stopImmediatePropagation()

        const droppedRaw = event.dataTransfer?.getData('text/plain') || ''
        if (!droppedRaw) return

        const remaining = remainingCapacity(editor, maxLength)
        if (remaining <= 0) return

        const toInsert = truncateToRemaining(droppedRaw, remaining)
        if (!toInsert) return

        insertPlainText(editor, toInsert)
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
  var baseToolbar = ['wproofreader', '|', 'undo', 'redo']

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
        wireEditorToStore($el, editor)
        forcePastePlainText(editor)

        editor.model.document.on('change:data', () => {
          const html = editor.getData()
          $el.value = html
          $el.dispatchEvent(new Event('input', { bubbles: true }))
        })
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
          Editor.create($el, { toolbar: { items: ['undo', 'redo'] } })
            .then(editor => {
              const maxLength = parseInt($el.getAttribute('data-max-length'), 10)
              enforceEditorMaxLength(editor, maxLength)
              wireEditorToStore($el, editor)
              forcePastePlainText(editor)
            })
            .catch(function (innerErr) {
              console.error(innerErr)
            })
        }
      })
  })
})