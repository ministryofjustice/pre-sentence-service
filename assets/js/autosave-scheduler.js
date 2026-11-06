const AUTOSAVE_INTERVAL_MS = 15 * 1000

const noopStatus = {
  updateTimestamp() {},
  showConnectionError() {},
  showConnectionRestored() {},
}

export default class AutosaveScheduler {
  constructor({ save, status, isBlocked, intervalMs }) {
    this.save = save
    this.status = status || noopStatus
    this.isBlocked = isBlocked || (() => false)
    this.intervalMs = intervalMs || AUTOSAVE_INTERVAL_MS
    this.dirty = false
    this.intervalHandle = null
    this.onOffline = () => this.status.showConnectionError()
    this.onOnline = () => {
      if (this.dirty) {
        this.doSave()
      } else {
        this.status.showConnectionRestored()
      }
    }
  }

  start() {
    this.intervalHandle = setInterval(() => {
      if (this.dirty && !this.isBlocked()) {
        this.doSave()
      }
    }, this.intervalMs)
    window.addEventListener('offline', this.onOffline)
    window.addEventListener('online', this.onOnline)
  }

  stop() {
    clearInterval(this.intervalHandle)
    this.intervalHandle = null
    window.removeEventListener('offline', this.onOffline)
    window.removeEventListener('online', this.onOnline)
  }

  markDirty() {
    this.dirty = true
  }

  doSave() {
    return this.save().then(
      response => {
        if (response && response.ok) {
          this.dirty = false
          this.status.updateTimestamp(new Date())
          this.status.showConnectionRestored()
          response.text().then(text => console.log(`Form persisted: ${text}`))
        }
        return response
      },
      error => {
        this.status.showConnectionError()
        console.error(`Autosave failed: ${error.message}`)
        return null
      }
    )
  }
}
