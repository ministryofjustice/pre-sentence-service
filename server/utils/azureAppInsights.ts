import 'dotenv/config'
import { initialiseTelemetry, telemetry } from '@ministryofjustice/hmpps-azure-telemetry'
import applicationVersion from '../applicationVersion'

initialiseTelemetry({
  serviceName: applicationVersion.packageData.name,
  serviceVersion: applicationVersion.buildNumber,
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  debug: process.env.DEBUG_TELEMETRY === 'true',
})
  .addFilter(telemetry.processors.filterSpanWherePath(['/ping', '/assets/*']))
  .addModifier(telemetry.processors.enrichSpanNameWithHttpRoute())
  .startRecording()
