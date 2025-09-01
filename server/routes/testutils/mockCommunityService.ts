import CommunityService from '../../services/communityService'
import mapping from '../../../mappings/get-user-access.json'

export default class MockCommunityService extends CommunityService {
  constructor() {
    super(undefined as any)
  }

  async getUserAccess() {
    return {
      ...mapping.response.jsonBody,
    }
  }
}
