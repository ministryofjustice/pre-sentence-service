(function () {
  var cfg = window.wproofreaderConfig || {}
  var bundleUrl = cfg.bundleUrl || ''
  if (!bundleUrl) {
    console.warn('WProofreader: no bundle URL configured, spellchecker disabled')
    return
  }

  var bundleOrigin
  try {
    bundleOrigin = new URL(bundleUrl)
  } catch (e) {
    console.error('WProofreader: invalid bundle URL "' + bundleUrl + '"', e)
    return
  }
  window.wproofreaderProtocol = bundleOrigin.protocol.replace(':', '')
  window.wproofreaderHost = bundleOrigin.hostname
  window.wproofreaderPort = bundleOrigin.port || (bundleOrigin.protocol === 'https:' ? '443' : '80')

  var serviceOptions = {
    serviceProtocol: window.wproofreaderProtocol,
    serviceHost: window.wproofreaderHost,
    servicePort: window.wproofreaderPort,
    servicePath: bundleOrigin.pathname.replace(/wscbundle\/wscbundle\.js$/, 'api').replace(/^\//, ''),
  }

  function initOnTextareas() {
    if (typeof window.WEBSPELLCHECKER === 'undefined') return
    var textareas = document.querySelectorAll('textarea:not([data-wsc-initialised])')
    textareas.forEach(function (el) {
      if (el.classList.contains('app-apply-ckeditor5')) return
      try {
        var initOptions = {
          container: el,
          lang: 'en_GB',
          removeBranding: true,
          settingsSections: ['general', 'options'],
        }
        Object.keys(serviceOptions).forEach(function (key) {
          initOptions[key] = serviceOptions[key]
        })
        window.WEBSPELLCHECKER.init(initOptions)
        el.setAttribute('data-wsc-initialised', 'true')
      } catch (e) {
        // Log but swallow per-element failures so one bad init can't break the page
        console.error('WProofreader: failed to initialise on textarea', e)
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
        console.info('WProofreader: bundle loaded successfully from ' + bundleUrl)
        resolve()
      }
      s.onerror = function () {
        reject(new Error('Failed to load WProofreader bundle from ' + bundleUrl + ' (check DNS, CSP and network tab)'))
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
      .catch(function (e) {
        // Licence expired etc — log but don't rethrow so app errors aren't caused
        console.error('WProofreader: spellchecker not started', e)
      })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start)
  } else {
    start()
  }
})()
