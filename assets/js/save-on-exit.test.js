/** @jest-environment jsdom */

describe('save-on-exit exit beacon', () => {
  let sendBeacon

  beforeAll(() => {
    document.body.innerHTML = `
      <form data-autosave="true">
        <input name="reportId" value="123">
        <input name="CSRFToken" value="test-token">
        <input type="checkbox" name="sourcesOfInformation" value="cps_summary" checked>
      </form>`

    sendBeacon = jest.fn(() => true)
    navigator.sendBeacon = sendBeacon

    window.ReportStore = {
      getHasUnsavedChanges: jest.fn(() => true),
      markChangesSaved: jest.fn(),
    }
    window.reportStoreInstance = {
      getState: () => ({ questions: {} }),
      subscribe: () => {},
    }

    require('./save-on-exit.js')
    window.dispatchEvent(new Event('load'))
  })

  beforeEach(() => {
    sendBeacon.mockClear()
  })

  it('sends the autosave beacon on pagehide when there are unsaved changes', () => {
    window.dispatchEvent(new Event('pagehide'))

    expect(sendBeacon).toHaveBeenCalledTimes(1)
  })

  it('does not send the beacon when pagehide follows a form submission', () => {
    const form = document.querySelector('form[data-autosave="true"]')
    form.dispatchEvent(new Event('submit', { cancelable: true }))

    window.dispatchEvent(new Event('pagehide'))

    expect(sendBeacon).not.toHaveBeenCalled()
  })
})
