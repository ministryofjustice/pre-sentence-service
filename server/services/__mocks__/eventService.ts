export default class EventService {
  public sendReportEvent() {
    return new Promise(resolve => {
      process.nextTick(() => resolve({}))
    })
  }
}
