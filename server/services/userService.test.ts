import UserService from './userService'
import HmppsAuthClient, { User } from '../data/hmppsAuthClient'
import TokenStore from '../data/tokenStore'
import { RedisClient } from '../data/redisClient'

jest.mock('../data/tokenStore')
jest.mock('../data/hmppsAuthClient')

const mockRedisClient = {
  on: jest.fn(),
} as unknown as RedisClient

const mockedTokenStore = jest.mocked(new TokenStore(mockRedisClient))

const token = 'some token'

describe('User service', () => {
  let hmppsAuthClient: jest.Mocked<HmppsAuthClient>
  let userService: UserService

  describe('getUser', () => {
    beforeEach(() => {
      hmppsAuthClient = new HmppsAuthClient(mockedTokenStore) as jest.Mocked<HmppsAuthClient>
      userService = new UserService(hmppsAuthClient)
    })
    it('Retrieves and formats user name', async () => {
      hmppsAuthClient.getUser.mockResolvedValue({ name: 'john smith' } as User)

      const result = await userService.getUser(token)

      expect(result.displayName).toEqual('John Smith')
    })
    it('Propagates error', async () => {
      hmppsAuthClient.getUser.mockRejectedValue(new Error('some error'))

      await expect(userService.getUser(token)).rejects.toEqual(new Error('some error'))
    })
  })
})
