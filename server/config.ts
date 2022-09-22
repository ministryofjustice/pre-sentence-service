import 'dotenv/config'
import crypto from 'crypto'

const production = process.env.NODE_ENV === 'production'

function get<T>(name: string, fallback: T, options = { requireInProduction: false }): T | string {
  if (process.env[name]) {
    return process.env[name]
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback
  }
  throw new Error(`Missing env var ${name}`)
}

const requiredInProduction = { requireInProduction: true }

export class AgentConfig {
  maxSockets: 100

  maxFreeSockets: 10

  freeSocketTimeout: 30000
}

export interface ApiConfig {
  url: string
  timeout: {
    response: number
    deadline: number
  }
  agent: AgentConfig
}

export default {
  nonce: crypto.randomBytes(16).toString('base64'),
  https: production,
  staticResourceCacheDuration: 20,
  redis: {
    host: get('REDIS_HOST', 'localhost', requiredInProduction),
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_AUTH_TOKEN,
    tls_enabled: get('REDIS_TLS_ENABLED', 'false'),
  },
  session: {
    secret: get('SESSION_SECRET', 'app-insecure-default-session', requiredInProduction),
    expiryMinutes: Number(get('WEB_SESSION_TIMEOUT_IN_MINUTES', 120)),
  },
  apis: {
    hmppsAuth: {
      url: get('HMPPS_AUTH_URL', 'http://localhost:9090/auth', requiredInProduction),
      externalUrl: get('HMPPS_AUTH_EXTERNAL_URL', get('HMPPS_AUTH_URL', 'http://localhost:9090/auth')),
      timeout: {
        response: Number(get('HMPPS_AUTH_TIMEOUT_RESPONSE', 10000)),
        deadline: Number(get('HMPPS_AUTH_TIMEOUT_DEADLINE', 10000)),
      },
      agent: new AgentConfig(),
      apiClientId: get('API_CLIENT_ID', 'pre-sentence-service', requiredInProduction),
      apiClientSecret: get('API_CLIENT_SECRET', 'clientsecret', requiredInProduction),
      systemClientId: get('AUTH_API_CLIENT_ID', 'community-api-client', requiredInProduction),
      systemClientSecret: get('AUTH_API_CLIENT_SECRET', 'community-api-client', requiredInProduction),
    },
    tokenVerification: {
      url: get('TOKEN_VERIFICATION_API_URL', 'http://localhost:8100', requiredInProduction),
      timeout: {
        response: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 5000)),
        deadline: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_DEADLINE', 5000)),
      },
      agent: new AgentConfig(),
      enabled: get('TOKEN_VERIFICATION_ENABLED', 'false') === 'true',
    },
    preSentenceToDeliusApi: {
      url: get('PRE_SENTENCE_TO_DELIUS_API_URL', 'http://localhost:9092', requiredInProduction),
      timeout: {
        response: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 5000)),
        deadline: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_DEADLINE', 5000)),
      },
      agent: new AgentConfig(),
    },
    communityApi: {
      url: get('COMMUNITY_API_URL', 'http://localhost:8096', requiredInProduction),
      timeout: {
        response: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 5000)),
        deadline: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_DEADLINE', 5000)),
      },
      agent: new AgentConfig(),
    },
    gotenberg: {
      apiUrl: get('GOTENBERG_API_URL', 'http://localhost:3001', requiredInProduction),
      /*
       This is specific to the machine type you use locally:
       - For Mac or Docker-for-Windows users,  http://host.docker.internal:3000 finds the docker host
       - For Linux users, this will also work, but you need to define it as a host at docker startup
         e.g. $ docker-compose -f <file> up --add-host host.docker.internal:host-gateway -d
       - In Cloud Platform environments, this value is overridden with a URL with the container name
       You can check if this works using curl from within the Gotenberg container:
         $ docker exec -it <gotenberg-container-id> /bin/bash
         $ curl http://host.docker.internal:3000  (should show redirect /login)
       */
      preSentenceUrl: get('PRE_SENTENCE_URL', 'http://host.docker.internal:3000', requiredInProduction),
    },
    wproofreader: {
      serviceProtocol: get('WPROOFREADER_PROTOCOL', 'http', requiredInProduction),
      serviceHost: get('WPROOFREADER_HOST', 'localhost', requiredInProduction),
      servicePort: get('WPROOFREADER_PORT', 8081),
    },
  },
  domain: get('INGRESS_URL', 'http://localhost:3000', requiredInProduction),
  db: {
    username: get('DB_USER', 'pre-sentence-service'),
    password: get('DB_PASS', 'pre-sentence-service'),
    server: get('DB_SERVER', 'localhost'),
    database: get('DB_NAME', 'pre-sentence-service'),
    port: get('DB_PORT', 5432),
    sslEnabled: get('DB_SSL_ENABLED', 'false'),
    schema: get('DB_SCHEMA', 'public'),
    migrations: get('DB_RUN_MIGRATIONS', 'true'),
  },
  aws: {
    sns: {
      endpoint: get('AWS_ENDPOINT', null), // Only set locally in order to use with localstack
      region: get('AWS_REGION', 'eu-west-2'),
      topicArn: get(
        'TOPIC_ARN',
        'arn:aws:sns:eu-west-2:000000000000:pre-sentence-service-topic-arn',
        requiredInProduction
      ),
      accessKeyId: get('ACCESS_KEY_ID', 'pre-sentence-service', requiredInProduction),
      secretAccessKey: get('SECRET_ACCESS_KEY', 'pre-sentence-service', requiredInProduction),
      eventVersion: 1,
    },
  },
}
