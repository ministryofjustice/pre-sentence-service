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
    Editor.create($el, editorConfig).catch(err => {
      console.error(err)
      if (wproofreaderLicenceKey) {
        Editor.create($el, { toolbar: { items: baseToolbar.slice() } }).catch(function (innerErr) {
          console.error(innerErr)
        })
      }
    })
  })
})
