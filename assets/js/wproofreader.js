(function () {
  var cfg = window.wproofreaderConfig || {}
  var licenceKey = cfg.serviceId || ''
  var bundleUrl = cfg.bundleUrl || ''
  if (!licenceKey || !bundleUrl) return

  var bundleOrigin
  try {
    bundleOrigin = new URL(bundleUrl)
  } catch (e) {
    return
  }
  window.wproofreaderProtocol = bundleOrigin.protocol.replace(':', '')
  window.wproofreaderHost = bundleOrigin.hostname
  window.wproofreaderPort = bundleOrigin.port || (bundleOrigin.protocol === 'https:' ? '443' : '80')

  function initOnTextareas() {
    if (typeof window.WEBSPELLCHECKER === 'undefined') return
    var textareas = document.querySelectorAll('textarea:not([data-wsc-initialised])')
    textareas.forEach(function (el) {
      if (el.classList.contains('app-apply-ckeditor5')) return
      try {
        window.WEBSPELLCHECKER.init({
          container: el,
          serviceId: licenceKey,
          lang: 'en_GB',
          removeBranding: true,
          settingsSections: ['general', 'options'],
        })
        el.setAttribute('data-wsc-initialised', 'true')
      } catch (e) {
        // Swallow per-element failures so one bad init can't break the page
      }
    })
  }

  function loadBundle() {
    return new Promise(function (resolve, reject) {
      if (typeof window.WEBSPELLCHECKER !== 'undefined') return resolve()
      var s = document.createElement('script')
      s.src = bundleUrl
      s.async = true
      s.onload = function () {
        resolve()
      }
      s.onerror = function () {
        reject(new Error('Failed to load WProofreader bundle'))
      }
      document.head.appendChild(s)
    })
  }

  function start() {
    loadBundle()
      .then(function () {
        initOnTextareas()
        // Re-scan for textareas added after page load
        var observer = new MutationObserver(function () {
          initOnTextareas()
        })
        observer.observe(document.body, { childList: true, subtree: true })
      })
      .catch(function () {
        // Licence expired etc, fail silently to not cause app errors
      })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start)
  } else {
    start()
  }
})()
