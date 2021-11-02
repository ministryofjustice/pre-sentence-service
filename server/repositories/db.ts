import fs from 'fs'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'

import logger from '../../logger'
import config from '../config'
import Field from './entities/field'
import FieldValue from './entities/fieldValue'
import Report from './entities/report'
import ReportDefinition from './entities/reportDefinition'
import ReportDefinitionFields from './entities/reportDefinitionFields'

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
  entities: [ReportDefinition, Field, ReportDefinitionFields, Report, FieldValue],
  synchronize: true,
  logging: true,
}

export default async function getDatabaseConnection(): Promise<ConnectionResult> {
  try {
    const connection = await createConnection(connectionOptions)
    return [null, connection]
  } catch (error) {
    logger.error(`Failed to get database connection: ${error.message}`)
    return [error]
  }
}
