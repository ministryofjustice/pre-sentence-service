import { createClient } from 'redis'

export type RedisClient = ReturnType<typeof createClient>

const url =
  process.env.REDIS_TLS_ENABLED === 'true'
    ? `rediss://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    : `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

export const createRedisClient = ({ legacyMode }: { legacyMode: boolean }): RedisClient => {
  const client = createClient({
    url,
    password: process.env.REDIS_AUTH_TOKEN,
    legacyMode,
    socket: {
      reconnectStrategy: (attempts: number) => {
        // Exponential back off: 20ms, 40ms, 80ms..., capped to retry every 30 seconds
        const nextDelay = Math.min(2 ** attempts * 20, 30000)
        // logger.info(`Retry Redis connection attempt: ${attempts}, next attempt in: ${nextDelay}ms`)
        return nextDelay
      },
    },
  })

  // client.on('error', (e: Error) => logger.error('Redis client error', e))

  return client
}
