import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import mapping from '../../../mappings/get-context.json'

export default class MockPreSentenceToDeliusService extends PreSentenceToDeliusService {
  constructor() {
    super(undefined)
  }

  async getContext(reportId: string) {
    return {
      reportId,
      ...mapping.response.jsonBody,
    }
  }
}
