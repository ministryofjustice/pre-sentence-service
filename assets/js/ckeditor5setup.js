document.addEventListener('DOMContentLoaded', () => {
  var isAutoSaving = false
  function hideError () {
    var $el = document.querySelector('#pss-version-mismatch')
    $el.classList.add('govuk-!-display-none')
    $el.setAttribute('aria-hidden', 'true')
  }

  function showError () {
    var $el = document.querySelector('#pss-version-mismatch')
    $el.classList.remove('govuk-!-display-none')
    $el.removeAttribute('aria-hidden')
  }

  function handleStatusChange (editor) {
    const pendingActions = editor.plugins.get('PendingActions')
    pendingActions.on('change:hasAny', (evt, propertyName, newValue) => {
      isAutoSaving = newValue
    })
  }

  var buttons = document.getElementsByClassName('govuk-button')
  for (var i = 0, len = buttons.length; i < len; i ++) {
    $(buttons[i]).on('click', function (event) {
      if (isAutoSaving) {
        event.preventDefault()
      }
    })
  }

  document.querySelectorAll('.moj-side-navigation__item a').forEach(function ($el) {
    $($el).on('click', function (event) {
      event.preventDefault()
      const baseURI = event.target.baseURI
      if (baseURI.indexOf('/sign-report') > 0 || isAutoSaving) {
        return true
      }
      const form = $(document.forms[0])
      const redirectPath = event.target.attributes.href.value
      form.attr(
        'action',
        baseURI.substr(baseURI.indexOf('/')) + '?redirectPath=' + redirectPath.substr(redirectPath.lastIndexOf('/') + 1)
      )
      form.submit()
    })
  })

  document.querySelectorAll('.app-apply-ckeditor5').forEach(function ($el) {
    ClassicEditor.create($el, {
      autosave: {
        save (editor) {
          var xhr = new XMLHttpRequest()
          xhr.open('POST', 'auto-save', true)
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.setRequestHeader('x-csrf-token', window.csrfToken)
          xhr.setRequestHeader('Accept', 'application/json')
          xhr.onload = function () {
            this.status >= 200 && this.status < 400 ? hideError() : showError()
          }
          xhr.send(
            JSON.stringify([
              {
                id: $(editor.sourceElement).attr('id'),
                value: editor.getData(),
              },
            ])
          )
        },
      },
    }).then(editor => {
      handleStatusChange(editor)
    }).catch(err => {
      console.error(err)
    })
  })
})
