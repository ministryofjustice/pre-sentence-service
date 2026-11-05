import { createClient } from 'redis'

import logger from '../../logger'
import { LogDependency, LogOperation, LogEvent } from '../utils/logging'
import config from '../config'

export type RedisClient = ReturnType<typeof createClient>

const url =
  config.redis.tls_enabled === 'true'
    ? `rediss://${config.redis.host}:${config.redis.port}`
    : `redis://${config.redis.host}:${config.redis.port}`

export const createRedisClient = ({ legacyMode }: { legacyMode: boolean }): RedisClient => {
  const client = createClient({
    url,
    password: config.redis.password,
    legacyMode,
    socket: {
      reconnectStrategy: (attempts: number) => {
        // Exponential back off: 20ms, 40ms, 80ms..., capped to retry every 30 seconds
        const nextDelay = Math.min(2 ** attempts * 20, 30000)
        logger.warn(
          {
            event: LogEvent.DependencyRetry,
            dependency: LogDependency.Redis,
            operation: LogOperation.Connect,
            attempt: attempts + 1,
            retryDelayMs: nextDelay,
          },
          'Redis reconnection scheduled'
        )
        return nextDelay
      },
    },
  })

  client.on('error', (error: Error) => {
    logger.error(
      {
        err: error,
        event: LogEvent.DependencyFailed,
        dependency: LogDependency.Redis,
      },
      'Redis client error'
    )
  })

  return client
}
