import mapping from '../../../mappings/get-user-access.json'

export default class CommunityService {
  public getUserAccess() {
    return new Promise(resolve => {
      process.nextTick(() =>
        resolve({
          ...mapping.response.jsonBody,
        })
      )
    })
  }
}
