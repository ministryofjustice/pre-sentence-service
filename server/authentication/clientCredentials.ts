import config from '../config'

function generateToken(clientId: string, clientSecret: string): string {
  const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  return `Basic ${token}`
}

export default function generateOauthClientToken(
  clientId: string = config.apis.hmppsAuth.apiClientId,
  clientSecret: string = config.apis.hmppsAuth.apiClientSecret
): string {
  return generateToken(clientId, clientSecret)
}
