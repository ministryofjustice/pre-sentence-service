import UserService from '../../services/userService'
import HmppsAuthClient from '../../data/hmppsAuthClient'
import TokenStore from '../../data/tokenStore'
import { RedisClient } from '../../data/redisClient'

jest.mock('../../data/tokenStore')
jest.mock('../../data/hmppsAuthClient')

const mockRedisClient = {
  on: jest.fn(),
} as unknown as RedisClient

const mockedTokenStore = jest.mocked(new TokenStore(mockRedisClient))
const mockedAuth = jest.mocked(new HmppsAuthClient(mockedTokenStore))

const user = {
  name: 'john smith',
  firstName: 'john',
  lastName: 'smith',
  username: 'user1',
  displayName: 'John Smith',
}

export default class MockUserService extends UserService {
  constructor() {
    super(mockedAuth)
  }

  async getUser(token: string) {
    return {
      token,
      ...user,
    }
  }
}
