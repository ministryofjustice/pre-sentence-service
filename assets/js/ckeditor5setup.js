document.addEventListener('DOMContentLoaded', () => {
  const INVISIBLE_NON_COUNTING_CHARS = /[\u00AD\u034F\u061C\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g

  function normaliseIncomingPlainText(value) {
    return (value || '')
      .replace(/\r\n?/g, '\n')
      .replace(/[\u2028\u2029]/g, '\n')
      .replace(INVISIBLE_NON_COUNTING_CHARS, '')
  }

  function plainTextToHtml(text) {
    var escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    var html = escaped.replace(/\n(?:[ \t]*\n)+/g, '</p><p>').replace(/\n/g, '<br>')
    return '<p>' + html + '</p>'
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
        var html = plainTextToHtml(normaliseIncomingPlainText(text))
        data.content = editor.data.processor.toView(html)
      },
      { priority: 'high' }
    )
  }

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
  var wproofreaderBundleUrl = wpCfg.bundleUrl || ''
  var baseToolbar = ['wproofreader', '|', 'undo', 'redo']

  function buildWproofreaderConfig() {
    if (!wproofreaderBundleUrl) return null
    var cfg = {
      srcUrl: wproofreaderBundleUrl,
      lang: 'en_GB',
      removeBranding: true,
      settingsSections: ['general', 'options'],
    }
    try {
      var origin = new URL(wproofreaderBundleUrl)
      cfg.serviceProtocol = origin.protocol.replace(':', '')
      cfg.serviceHost = origin.hostname
      cfg.servicePort = origin.port || (origin.protocol === 'https:' ? '443' : '80')
      cfg.servicePath = origin.pathname.replace(/wscbundle\/wscbundle\.js$/, 'api').replace(/^\//, '')
    } catch (e) {
      return null
    }
    return cfg
  }

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
    var wproofreaderEditorConfig = buildWproofreaderConfig()
    if (wproofreaderEditorConfig) {
      editorConfig.wproofreader = wproofreaderEditorConfig
    }
    Editor.create($el, editorConfig)
      .then(editor => {
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

        if (wproofreaderBundleUrl) {
          Editor.create($el, { toolbar: { items: ['undo', 'redo'] } })
            .then(editor => {
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