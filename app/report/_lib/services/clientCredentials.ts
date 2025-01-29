function generateToken(clientId: string, clientSecret: string): string {
  const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  return `Basic ${token}`
}

export default function generateOauthClientToken(
  clientId: string = process.env.API_CLIENT_ID,
  clientSecret: string = process.env.API_CLIENT_SECRET
): string {
  return generateToken(clientId, clientSecret)
}
