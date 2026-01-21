import fs from 'fs'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'

import logger from '../../logger'
import config from '../config'
import LocalAuthorities from './entities/localAuthorities'
import PersonDetails from './entities/personDetails'
import ReportDetails from './entities/reportDetails'
import SourcesOfInformation from './entities/sourcesOfInformation'
import ReportAndSourcesOfInformation from './entities/reportSourcesOfInformation'
import { HttpError } from 'http-errors'

type ConnectionResult = [Error?, Connection?]

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: String(config.db.server),
  schema: String(config.db.schema),
  port: Number(config.db.port || 5432),
  username: String(config.db.username),
  password: String(config.db.password),
  database: String(config.db.database),
  ssl:
    config.db.sslEnabled === 'true'
      ? {
          rejectUnauthorized: true,
          ca: fs.readFileSync('/app/certs/eu-west-2-bundle.pem').toString(),
        }
      : false,
  entities: [LocalAuthorities, PersonDetails, ReportDetails, SourcesOfInformation, ReportAndSourcesOfInformation],
  migrationsRun: config.db.migrations === 'true',
  migrations: ['dist/db/migrations/*.js'],
  logging: false,
}

export default async function getDatabaseConnection(): Promise<ConnectionResult> {
  try {
    const connection = await createConnection(connectionOptions)
    return [undefined, connection]
  } catch (e) {
    const error = e as HttpError
    logger.error(`Failed to get database connection: ${error.message}`)
    return [error]
  }
}
