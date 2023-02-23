document.addEventListener('DOMContentLoaded', () => {
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
      event.preventDefault()
      var form = $(document.forms[0])
      var redirectPath = event.target.attributes.href.value
      form.attr(
        'action',
        event.target.baseURI + '?redirectPath=' + redirectPath.substr(redirectPath.lastIndexOf('/') + 1)
      )
      form.submit()
    })
  })

  document.querySelectorAll('.app-apply-ckeditor5').forEach(function ($el) {
    ClassicEditor.create($el, {
      autosave: {
        save(editor) {
          var xhr = new XMLHttpRequest()
          xhr.open('POST', 'auto-save', true)
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.setRequestHeader('x-csrf-token', window.csrfToken)
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
    }).catch(err => {
      console.error(err)
    })
  })
})
