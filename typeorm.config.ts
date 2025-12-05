import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import config from './server/config'
import Report from './server/repositories/entities/report'
import LocalAuthorities from './server/repositories/entities/localAuthorities'
import PersonDetails from './server/repositories/entities/personDetails'
import ReportDetails from './server/repositories/entities/reportDetails'
import SourcesOfInformation from './server/repositories/entities/sourcesOfInformation'
import ReportSourcesOfInformation from './server/repositories/entities/reportSourcesOfInformation'
import ReportDefinition from './server/repositories/entities/reportDefinition'
import Field from './server/repositories/entities/field'
import FieldValue from './server/repositories/entities/fieldValue'
import Source from './server/repositories/entities/source'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: String(config.db.server),
  schema: String(config.db.schema),
  port: Number(config.db.port || 5432),
  username: String(config.db.username),
  password: String(config.db.password),
  database: String(config.db.database),
  entities: [
    Report,
    LocalAuthorities,
    PersonDetails,
    ReportDetails,
    SourcesOfInformation,
    ReportSourcesOfInformation,
    ReportDefinition,
    Field,
    FieldValue,
    Source,
  ],
  migrations: ['db/migrations/*.ts'],
  synchronize: false,
  logging: false,
})

export default AppDataSource
