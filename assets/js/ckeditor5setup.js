document.addEventListener('DOMContentLoaded', () => {
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