/* eslint-disable import/prefer-default-export */
import fs from 'fs'
import { DataSource } from 'typeorm'
import Field from '../../../_db/entities/field'
import FieldValue from '../../../_db/entities/fieldValue'
import ReportDefinition from '../../../_db/entities/reportDefinition'
import Report from '../../../_db/entities/report'
import { Setup1635852419286 } from '../../../_db/migrations/1635852419286-setup'
import { PopulateDefinitions1635854159945 } from '../../../_db/migrations/1635854159945-populate-definitions'
import { PopulateFields1635854233658 } from '../../../_db/migrations/1635854233658-populate-fields'
import { PopulateReportDefinitionFields1635854322522 } from '../../../_db/migrations/1635854322522-populate-report-definition-fields'
import { SeedData1641408084144 } from '../../../_db/migrations/1641408084144-seed-data'
import { PopulateFieldsAndReportDefinitions1641832115936 } from '../../../_db/migrations/1641832115936-populate-fields-and-report-definitions'
import { SeedReportData1642090824185 } from '../../../_db/migrations/1642090824185-seed-report-data'
import { SetupIntegration1647534413410 } from '../../../_db/migrations/1647534413410-setup-integration'
import { CorrectData1647867595326 } from '../../../_db/migrations/1647867595326-correct-data'
import { PopulateReportDefinitionFields1648030513945 } from '../../../_db/migrations/1648030513945-populate-report-definition-fields'
import { PopulateFieldsAndReportDefinitions1648743900043 } from '../../../_db/migrations/1648743900043-populate-fields-and-report-definitions'
import { SeedReportData1648745665052 } from '../../../_db/migrations/1648745665052-seed-report-data'
import { DeleteFieldTypeColumn1648747790181 } from '../../../_db/migrations/1648747790181-delete-field-type-column'
import { PopulateFieldsAndReportDefinitions1649252913826 } from '../../../_db/migrations/1649252913826-populate-fields-and-report-definitions'
import { UpdateSeedData1658928172110 } from '../../../_db/migrations/1658928172110-update-seed-data'
import { AddReportUpdated1660127156400 } from '../../../_db/migrations/1660127156400-add-report-updated'
import { RenameEventNumberColumn1662478333692 } from '../../../_db/migrations/1662478333692-rename-event-number-column'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: String(process.env.DB_SERVER),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASS),
  database: String(process.env.DB_NAME),
  ssl:
    process.env.DB_SSL_ENABLED === 'true'
      ? {
          rejectUnauthorized: true,
          ca: fs.readFileSync('/app/certs/eu-west-2-bundle.pem').toString(),
        }
      : false,
  entities: [Field, FieldValue, Report, ReportDefinition],
  migrationsRun: process.env.DB_RUN_MIGRATIONS === 'true',
  migrations: [
    Setup1635852419286,
    PopulateDefinitions1635854159945,
    PopulateFields1635854233658,
    PopulateReportDefinitionFields1635854322522,
    SeedData1641408084144,
    PopulateFieldsAndReportDefinitions1641832115936,
    SeedReportData1642090824185,
    SetupIntegration1647534413410,
    CorrectData1647867595326,
    PopulateReportDefinitionFields1648030513945,
    PopulateFieldsAndReportDefinitions1648743900043,
    SeedReportData1648745665052,
    DeleteFieldTypeColumn1648747790181,
    PopulateFieldsAndReportDefinitions1649252913826,
    UpdateSeedData1658928172110,
    AddReportUpdated1660127156400,
    RenameEventNumberColumn1662478333692,
  ],
  logging: false,
})

export const getDBConnection = async (): Promise<DataSource> => {
  console.log(
    "🚀 ~ getDBConnection ~ process.env.DB_RUN_MIGRATIONS === 'true':",
    process.env.DB_RUN_MIGRATIONS === 'true'
  )
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
  return AppDataSource
}
