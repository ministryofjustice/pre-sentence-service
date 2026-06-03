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

  document.querySelectorAll('.app-apply-ckeditor5').forEach(function ($el) {
    ClassicEditor.create($el, {
      // autosave: {
      //   save(editor) {
      //     var xhr = new XMLHttpRequest()
      //     xhr.open('POST', 'auto-save', true)
      //     xhr.setRequestHeader('Content-Type', 'application/json')
      //     xhr.setRequestHeader('x-csrf-token', window.csrfToken)
      //     xhr.setRequestHeader('Accept', 'application/json')
      //     xhr.onload = function () {
      //       this.status >= 200 && this.status < 400 ? hideError() : showError()
      //     }
      //     xhr.send(
      //       JSON.stringify([
      //         {
      //           id: $(editor.sourceElement).attr('id'),
      //           value: editor.getData(),
      //         },
      //       ])
      //     )
      //   },
      // },
    })
      .then(editor => {
        const maxLength = parseInt($el.getAttribute('data-max-length'), 10)
        enforceEditorMaxLength(editor, maxLength)
      })
      .catch(err => {
      console.error(err)
      })
  })
})
