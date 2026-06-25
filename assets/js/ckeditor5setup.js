document.addEventListener('DOMContentLoaded', () => {
  function plainTextLength(editor) {
    const text = editor.editing.view.getDomRoot()?.innerText || ''
    return text.length
  }

  function enforceEditorMaxLength(editor, maxLength) {
    if (!Number.isFinite(maxLength) || maxLength <= 0) return

    let lastValidData = editor.getData()
    let restoring = false

    editor.model.document.on('change:data', () => {
      if (restoring) return

      const length = plainTextLength(editor)
      if (length <= maxLength) {
        lastValidData = editor.getData()
        return
      }

      restoring = true
      try {
        const selection = editor.model.document.selection.getFirstPosition()

        editor.setData(lastValidData)

        if (selection) {
          editor.model.change(writer => {
            const root = editor.model.document.getRoot()
            const maxOffset = root.maxOffset
            const offset = Math.min(selection.offset, maxOffset)
            writer.setSelection(writer.createPositionAt(root, offset))
          })
        }
      } finally {
        restoring = false
      }
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
