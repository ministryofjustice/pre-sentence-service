import fs from 'fs'
import { DataSource, DataSourceOptions } from 'typeorm'

import logger from '../../logger'
import config from '../config'
import LocalAuthorities from './entities/localAuthorities'
import PersonDetails from './entities/personDetails'
import ReportDetails from './entities/reportDetails'
import ReportStatusHistory from './entities/reportStatusHistory'
import SourcesOfInformation from './entities/sourcesOfInformation'
import ReportAndSourcesOfInformation from './entities/reportSourcesOfInformation'
import { HttpError } from 'http-errors'
import { LogDependency, LogEvent, LogOperation } from '../utils/logging'

type ConnectionResult = [Error?, DataSource?]

const connectionOptions: DataSourceOptions = {
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
  entities: [
    LocalAuthorities,
    PersonDetails,
    ReportDetails,
    ReportStatusHistory,
    SourcesOfInformation,
    ReportAndSourcesOfInformation,
  ],
  migrationsRun: config.db.migrations === 'true',
  migrations: ['dist/db/migrations/*.js'],
  logging: false,
}

export const dataSource = new DataSource(connectionOptions)

export default async function getDatabaseConnection(): Promise<ConnectionResult> {
  try {
    const connection = await dataSource.initialize()
    return [undefined, connection]
  } catch (e) {
    const error = e as HttpError

    logger.error(
      {
        event: LogEvent.DependencyFailed,
        dependency: LogDependency.Postgres,
        operation: LogOperation.Connect,
        errorName: error.name,
        message: error.message,
      },
      `Failed to get database connection`
    )

    return [error]
  }
}
