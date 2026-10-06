/** @jest-environment jsdom */
import AutosaveScheduler from './autosave-scheduler.js'

const INTERVAL_MS = 15 * 1000

let save
let status
let scheduler

function okResponse() {
  return Promise.resolve({ ok: true, text: () => Promise.resolve('ok') })
}

function createScheduler(options = {}) {
  scheduler = new AutosaveScheduler({ save, status, ...options })
  scheduler.start()
  return scheduler
}

async function flushPromises() {
  // jest.advanceTimersByTime queues promise callbacks; drain the microtask queue
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
}

beforeEach(() => {
  jest.useFakeTimers()
  save = jest.fn().mockImplementation(okResponse)
  status = {
    updateTimestamp: jest.fn(),
    showConnectionError: jest.fn(),
    showConnectionRestored: jest.fn(),
  }
})

afterEach(() => {
  if (scheduler) {
    scheduler.stop()
    scheduler = null
  }
  jest.clearAllTimers()
  jest.useRealTimers()
})

describe('fixed save cycle', () => {
  it('saves on the 15 second tick when there are unsaved changes', () => {
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS - 1000)
    expect(save).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(save).toHaveBeenCalledTimes(1)
  })

  it('does not save when there are no unsaved changes', () => {
    createScheduler()
    jest.advanceTimersByTime(INTERVAL_MS * 3)
    expect(save).not.toHaveBeenCalled()
  })

  it('is not postponed by continued changes (fixed cycle, not debounce)', () => {
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(5000)
    scheduler.markDirty()
    jest.advanceTimersByTime(5000)
    scheduler.markDirty()
    jest.advanceTimersByTime(4000)
    scheduler.markDirty()
    expect(save).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(save).toHaveBeenCalledTimes(1)
  })

  it('clears the dirty state after a successful save', async () => {
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS)
    await flushPromises()
    jest.advanceTimersByTime(INTERVAL_MS)
    expect(save).toHaveBeenCalledTimes(1)
  })

  it('stays dirty and retries after a failed save', async () => {
    save.mockRejectedValueOnce(new TypeError('network down'))
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS)
    await flushPromises()
    jest.advanceTimersByTime(INTERVAL_MS)
    expect(save).toHaveBeenCalledTimes(2)
  })

  it('skips the save while blocked', () => {
    createScheduler({ isBlocked: () => true })
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS)
    expect(save).not.toHaveBeenCalled()
  })

  it('stops saving after stop()', () => {
    createScheduler()
    scheduler.markDirty()
    scheduler.stop()
    jest.advanceTimersByTime(INTERVAL_MS * 2)
    expect(save).not.toHaveBeenCalled()
  })
})

describe('save outcomes', () => {
  it('updates the timestamp and marks the connection restored on success', async () => {
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS)
    await flushPromises()
    expect(status.updateTimestamp).toHaveBeenCalledWith(expect.any(Date))
    expect(status.showConnectionRestored).toHaveBeenCalled()
  })

  it('shows the connection error banner when the save fails with a network error', async () => {
    save.mockRejectedValueOnce(new TypeError('network down'))
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS)
    await flushPromises()
    expect(status.showConnectionError).toHaveBeenCalled()
    expect(status.updateTimestamp).not.toHaveBeenCalled()
  })

  it('does not show a connection banner for an HTTP error response', async () => {
    save.mockResolvedValueOnce({ ok: false, status: 500, text: () => Promise.resolve('boom') })
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS)
    await flushPromises()
    expect(status.showConnectionError).not.toHaveBeenCalled()
    expect(status.updateTimestamp).not.toHaveBeenCalled()
  })

  it('works without a status module (pages with no autosave banner)', async () => {
    save.mockRejectedValueOnce(new TypeError('network down'))
    status = undefined
    createScheduler()
    scheduler.markDirty()
    jest.advanceTimersByTime(INTERVAL_MS)
    await flushPromises()
    jest.advanceTimersByTime(INTERVAL_MS)
    await flushPromises()
    expect(save).toHaveBeenCalledTimes(2)
  })
})

describe('browser connectivity events', () => {
  it('shows the connection error banner when the browser goes offline', () => {
    createScheduler()
    window.dispatchEvent(new Event('offline'))
    expect(status.showConnectionError).toHaveBeenCalled()
  })

  it('saves immediately on reconnect when there are unsaved changes', async () => {
    createScheduler()
    scheduler.markDirty()
    window.dispatchEvent(new Event('online'))
    expect(save).toHaveBeenCalledTimes(1)
    await flushPromises()
    expect(status.updateTimestamp).toHaveBeenCalled()
    expect(status.showConnectionRestored).toHaveBeenCalled()
  })

  it('marks the connection restored without saving when there are no unsaved changes', () => {
    createScheduler()
    window.dispatchEvent(new Event('online'))
    expect(save).not.toHaveBeenCalled()
    expect(status.showConnectionRestored).toHaveBeenCalled()
  })

  it('ignores connectivity events after stop()', () => {
    createScheduler()
    scheduler.stop()
    window.dispatchEvent(new Event('offline'))
    expect(status.showConnectionError).not.toHaveBeenCalled()
  })
})
