import superagent from 'superagent'
import querystring from 'querystring'
import type TokenStore from './tokenStore'

// import generateOauthClientToken from '../authentication/clientCredentials'
import RestClient from './restClient'
import generateOauthClientToken from './clientCredentials'

const timeoutSpec = {
  response: parseInt(process.env.HMPPS_AUTH_TIMEOUT_RESPONSE, 10),
  deadline: parseInt(process.env.HMPPS_AUTH_TIMEOUT_DEADLINE, 10),
}
const hmppsAuthUrl = process.env.HMPPS_AUTH_URL

function getApiClientTokenFromHmppsAuth(username?: string): Promise<superagent.Response> {
  const clientId = username ? process.env.API_CLIENT_ID : process.env.AUTH_API_CLIENT_ID
  const clientSecret = username ? process.env.API_CLIENT_SECRET : process.env.AUTH_API_CLIENT_SECRET
  const clientToken = generateOauthClientToken(clientId, clientSecret)

  const authRequest = username
    ? querystring.stringify({ grant_type: 'client_credentials', username })
    : querystring.stringify({ grant_type: 'client_credentials' })

  // logger.info(`HMPPS Auth request '${authRequest}'`)
  // logger.info(`For client id '${clientId}'${username ? ` and user '${username}'` : ''}`)

  return superagent
    .post(`${hmppsAuthUrl}/oauth/token`)
    .set('Authorization', clientToken)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(authRequest)
    .timeout(timeoutSpec)
}

export interface User {
  name: string
  activeCaseLoadId: string
}

export interface UserRole {
  roleCode: string
}

export default class HmppsAuthClient {
  constructor(private readonly tokenStore: TokenStore) {}

  private restClient(token: string): RestClient {
    return new RestClient(
      'HMPPS Auth Client',
      {
        url: process.env.HMPPS_AUTH_URL,
        timeout: timeoutSpec,
        agent: {
          maxSockets: 100,
          maxFreeSockets: 10,
          freeSocketTimeout: 30000,
        },
      },
      token
    )
  }

  getUser(token: string): Promise<User> {
    // logger.info(`Getting user details: calling HMPPS Auth`)
    return this.restClient(token).get({ path: '/api/user/me' }) as Promise<User>
  }

  getUserRoles(token: string): Promise<string[]> {
    return this.restClient(token)
      .get({ path: '/api/user/me/roles' })
      .then(roles => (<UserRole[]>roles).map(role => role.roleCode)) as Promise<string[]>
  }

  async getApiClientToken(username?: string): Promise<string> {
    const key = username || '%SYSTEM%'

    const token = await this.tokenStore.getToken(key)
    if (token) {
      return token
    }

    const newToken = await getApiClientTokenFromHmppsAuth(username)

    // set TTL slightly less than expiry of token. Async but no need to wait
    await this.tokenStore.setToken(key, newToken.body.access_token, newToken.body.expires_in - 60)

    return newToken.body.access_token
  }
}
