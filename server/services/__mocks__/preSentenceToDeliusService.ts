import mapping from '../../../mappings/get-context.json'

export default class PreSentenceToDeliusService {
  public getContext() {
    return new Promise(resolve => {
      process.nextTick(() => resolve(mapping.response.jsonBody))
    })
  }
}
