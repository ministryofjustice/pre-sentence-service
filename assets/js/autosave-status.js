import AutosaveScheduler from './autosave-scheduler.js'

function pad(value) {
  return String(value).padStart(2, '0')
}

export default class AutosaveStatus {
  constructor($module) {
    this.$module = $module
    this.$time = $module.querySelector('[data-autosave-time]')
    this.$errorBanner = $module.querySelector('[data-connection-error]')
    this.$successBanner = $module.querySelector('[data-connection-restored]')
    this.connectionFailed = false
    this.focusMoved = false
  }

  updateTimestamp(date) {
    this.$time.textContent = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  showConnectionError() {
    this.connectionFailed = true
    this.$successBanner.hidden = true
    this.$errorBanner.hidden = false

    if (!this.focusMoved) {
      this.focusMoved = true
      this.$errorBanner.focus()
    }
  }

  showConnectionRestored() {
    if (!this.connectionFailed) {
      return
    }
    this.$errorBanner.hidden = true
    this.$successBanner.hidden = false
  }

  hasConnectionFailed() {
    return this.connectionFailed
  }
}

function init() {
  window.AutosaveScheduler = AutosaveScheduler

  const $module = document.querySelector('[data-module="psr-autosave-status"]')
  if ($module) {
    window.AutosaveStatus = new AutosaveStatus($module)
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}
