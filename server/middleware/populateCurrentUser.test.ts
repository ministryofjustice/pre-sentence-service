import { Request, Response } from 'express'
import UserService from '../services/userService'
import populateCurrentUser from './populateCurrentUser'

describe('populateCurrentUser', () => {
  let req: Request
  let res: Response

  const getUserMock = jest.fn()
  const userServiceMock: UserService = {
    getUser: getUserMock,
  } as unknown as UserService

  const handler = populateCurrentUser(userServiceMock)
  const nextMock = jest.fn()

  beforeEach(jest.resetAllMocks)
  beforeEach(() => {
    req = {
      session: {},
    } as unknown as Request

    res = {
      locals: {
        user: {
          token: 'secret',
        },
      },
    } as unknown as Response
  })
  const userDetails = { name: 'testName', displayName: 'display name' }

  it('should call user service and set user details in session when not available', async () => {
    getUserMock.mockResolvedValue(userDetails)
    await handler(req, res, nextMock)
    expect(getUserMock).toHaveBeenCalledWith('secret')
    expect(req.session.userDetails).toEqual(userDetails)
    expect(res.locals.user).toEqual({ ...res.locals.user, ...userDetails })
  })

  it('should NOT call user service and set user details from session when available', async () => {
    req.session.userDetails = userDetails
    await handler(req, res, nextMock)
    expect(getUserMock).not.toHaveBeenCalled()
    expect(req.session.userDetails).toEqual(userDetails)
    expect(res.locals.user).toEqual({ ...res.locals.user, ...userDetails })
  })
})
