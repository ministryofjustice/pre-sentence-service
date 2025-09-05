import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import mapping from '../../../mappings/get-context.json'

export default class MockPreSentenceToDeliusService extends PreSentenceToDeliusService {
  constructor() {
    super(undefined as any)
  }

  async getContext(reportId: string) {
    return {
      reportId,
      ...mapping.response.jsonBody,
    }
  }
}
