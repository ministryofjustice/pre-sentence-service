import fs from 'fs'
import axios from 'axios'
import * as readline from 'readline'
import { createConnection } from 'typeorm'
import config from '../server/config'
import PersonDetails from '../server/repositories/entities/personDetails'
import ReportDetails from '../server/repositories/entities/reportDetails'
import LocalAuthorities from '../server/repositories/entities/localAuthorities'
import SourcesOfInformation from '../server/repositories/entities/sourcesOfInformation'
import ReportAndSourcesOfInformation from '../server/repositories/entities/reportSourcesOfInformation'

// Configuration
const DELIUS_API_URL = 'https://pre-sentence-reports-to-delius-dev.hmpps.service.justice.gov.uk'
const CSV_FILE_PATH = '/Users/arron.chave/git/pre-sentence-service/DELIUS_PSR_IDS_DEV.csv'
const BATCH_SIZE = 10 // Process 10 reports concurrently

interface DeliusDefendantDetails {
  crn: string
  eventNumber: number
  name: {
    forename: string
    middleName?: string
    surname: string
  }
  dateOfBirth: string
  pnc?: string
  mainAddress?: {
    buildingName?: string
    buildingNumber?: string
    streetName?: string
    district?: string
    town?: string
    county?: string
    postcode?: string
    noFixedAbode?: boolean
  }
}

interface DeliusOffence {
  date: string
  mainCategory: {
    code: string
    description: string
  }
  subCategory: {
    code: string
    description: string
  }
}

interface DeliusOffenceDetails {
  mainOffence: DeliusOffence
  additionalOffences: DeliusOffence[]
}

interface MigrationStats {
  total: number
  processed: number
  created: number
  skipped: number
  failed: number
  errors: Array<{ guid: string; error: string }>
}

let bearerToken: string

// Function to prompt for bearer token
async function promptForBearerToken(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve => {
    rl.question('Please enter the Bearer token for Delius API: ', answer => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

// Function to read GUIDs from CSV
function readGUIDs(filePath: string, limit?: number): string[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const guids = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return limit ? guids.slice(0, limit) : guids
}

// Function to fetch defendant details from Delius API
async function fetchDefendantDetails(guid: string): Promise<DeliusDefendantDetails | null> {
  try {
    const response = await axios.get(`${DELIUS_API_URL}/report/${guid}/defendant-details`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      timeout: 10000,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.log(`  ⚠️  Defendant details not found for ${guid}`)
        return null
      }
      throw new Error(`HTTP ${error.response?.status}: ${error.message}`)
    }
    throw error
  }
}

// Function to fetch offence details from Delius API
async function fetchOffenceDetails(crn: string, eventNumber: number): Promise<DeliusOffenceDetails | null> {
  try {
    const response = await axios.get(`${DELIUS_API_URL}/case/${crn}/event/${eventNumber}/offences`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      timeout: 10000,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.log(`  ⚠️  Offences not found for CRN ${crn}, Event ${eventNumber}`)
        return null
      }
      throw new Error(`HTTP ${error.response?.status}: ${error.message}`)
    }
    throw error
  }
}

// Function to create/update report directly in database
async function createReport(
  guid: string,
  defendantDetails: DeliusDefendantDetails,
  offenceDetails: DeliusOffenceDetails | null,
  connection: any,
  verbose = false
) {
  const reportType = 'short-format' // Assuming all are short-format reports
  const createdBy = 'migration-script'
  const now = new Date()

  // Build address object - matching the PersonDetails entity structure
  // If no address provided, create fake address data
  const address = defendantDetails.mainAddress
    ? {
        buildingName: defendantDetails.mainAddress.buildingName || '',
        buildingNumber: defendantDetails.mainAddress.buildingNumber || '',
        addressNumber: defendantDetails.mainAddress.buildingNumber || '',
        streetName: defendantDetails.mainAddress.streetName || '',
        district: defendantDetails.mainAddress.district || '',
        town: defendantDetails.mainAddress.town || '',
        county: defendantDetails.mainAddress.county || '',
        postcode: defendantDetails.mainAddress.postcode || '',
        noFixedAbode: defendantDetails.mainAddress.noFixedAbode || false,
      }
    : {
        buildingName: 'Address Not Available',
        buildingNumber: '0',
        addressNumber: '0',
        streetName: 'Unknown Street',
        district: 'Unknown District',
        town: 'Unknown',
        county: 'Unknown',
        postcode: 'XX0 0XX',
        noFixedAbode: false,
      }

  // Build main offence description
  const mainOffence = offenceDetails
    ? `${offenceDetails.mainOffence.mainCategory.description} - ${offenceDetails.mainOffence.subCategory.description}`
    : ''

  // Build other offences array
  const otherOffences = offenceDetails
    ? offenceDetails.additionalOffences.map(
        offence => `${offence.mainCategory.description} - ${offence.subCategory.description}`
      )
    : []

  const names = {
    foreName: defendantDetails.name.forename,
    middleName: defendantDetails.name.middleName || '',
    surname: defendantDetails.name.surname,
  }

  const court = {
    name: '', // Not provided by Delius API
    localJusticeArea: '',
  }

  try {
    if (verbose) console.log(`  🔍 Upserting person with CRN: ${defendantDetails.crn}`)

    // Check if person exists
    const existingPerson = await connection.query(
      `SELECT id FROM presentenceservice.person_details WHERE crn = $1`,
      [defendantDetails.crn]
    )

    let personId: number

    if (existingPerson.length > 0) {
      // Update existing person
      personId = existingPerson[0].id
      if (verbose) console.log(`  📝 Updating existing person record with ID: ${personId}`)

      await connection.query(
        `
        UPDATE presentenceservice.person_details
        SET
          names = $1,
          "dateOfBirth" = $2,
          pnc = $3,
          address = $4,
          "mainOffence" = $5,
          "otherOffences" = $6,
          court = $7,
          "lastUpdatedBy" = $8
        WHERE id = $9
        `,
        [
          JSON.stringify(names),
          defendantDetails.dateOfBirth,
          defendantDetails.pnc || '',
          JSON.stringify(address),
          mainOffence,
          JSON.stringify(otherOffences),
          JSON.stringify(court),
          now,
          personId,
        ]
      )
    } else {
      // Insert new person
      if (verbose) console.log(`  ➕ Creating new person record`)

      const personResult = await connection.query(
        `
        INSERT INTO presentenceservice.person_details (
          crn, names, "dateOfBirth", pnc, address, "mainOffence", "otherOffences", court,
          "createdAt", "createdBy", "lastUpdatedBy", "isDeleted", version
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id
        `,
        [
          defendantDetails.crn,
          JSON.stringify(names),
          defendantDetails.dateOfBirth,
          defendantDetails.pnc || '',
          JSON.stringify(address),
          mainOffence,
          JSON.stringify(otherOffences),
          JSON.stringify(court),
          now,
          createdBy,
          now,
          false,
          1,
        ]
      )
      personId = personResult[0].id
    }

    if (verbose) console.log(`  ✓ Upserted person record with ID: ${personId}`)

    // Check if report exists
    const existingReport = await connection.query(
      `SELECT id FROM presentenceservice.report_details WHERE id = $1`,
      [guid]
    )

    if (existingReport.length > 0) {
      // Update existing report
      if (verbose) console.log(`  📝 Updating existing report record with GUID: ${guid}`)

      await connection.query(
        `
        UPDATE presentenceservice.report_details
        SET
          "personId" = $1,
          origin = $2,
          "lastUpdatedBy" = $3
        WHERE id = $4
        `,
        [personId, defendantDetails.eventNumber.toString(), now, guid]
      )
    } else {
      // Insert new report
      if (verbose) console.log(`  ➕ Creating new report record with GUID: ${guid}`)

      await connection.query(
        `
        INSERT INTO presentenceservice.report_details (
          id, "personId", status, origin, "reportType", pages,
          "createdAt", "createdBy", "lastUpdatedBy", "isDeleted", version
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `,
        [
          guid,
          personId,
          'NOT_STARTED',
          defendantDetails.eventNumber.toString(),
          reportType,
          JSON.stringify([]),
          now,
          createdBy,
          now,
          false,
          1,
        ]
      )
    }

    if (verbose) console.log(`  ✓ Upserted report record with GUID: ${guid}`)

    // Verify the record was created (only in verbose mode)
    if (verbose) {
      const verifyResult = await connection.query(
        `SELECT id, "personId", status, "reportType" FROM presentenceservice.report_details WHERE id = $1`,
        [guid]
      )

      if (verifyResult.length > 0) {
        console.log(`  ✅ Verified record in database:`, verifyResult[0])
      } else {
        console.log(`  ⚠️  WARNING: Could not verify record in database!`)
      }
    }

    return { id: guid, personId }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Database error: ${error.message}`)
    }
    throw error
  }
}

// Function to process a single GUID
async function processGUID(guid: string, connection: any, stats: MigrationStats, verbose = false): Promise<void> {
  try {
    if (verbose) console.log(`\n📋 Processing GUID: ${guid}`)

    // Fetch defendant details from Delius API
    if (verbose) console.log(`  🔍 Fetching defendant details from Delius API...`)
    const defendantDetails = await fetchDefendantDetails(guid)

    if (!defendantDetails) {
      stats.skipped++
      return
    }

    console.log(
      `  ✓ Found defendant: ${defendantDetails.name.forename} ${defendantDetails.name.surname} (CRN: ${defendantDetails.crn})`
    )
    if (verbose && defendantDetails.pnc) {
      console.log(`     PNC: ${defendantDetails.pnc}`)
    }
    if (verbose && defendantDetails.mainAddress) {
      const addr = defendantDetails.mainAddress
      console.log(
        `     Address: ${[addr.buildingNumber, addr.buildingName, addr.streetName, addr.town, addr.postcode].filter(Boolean).join(', ')}`
      )
    } else if (verbose) {
      console.log(`     Address: Using fake address data (no address provided)`)
    }

    // Fetch offence details
    if (verbose) console.log(`  🔍 Fetching offence details...`)
    const offenceDetails = await fetchOffenceDetails(defendantDetails.crn, defendantDetails.eventNumber)

    if (offenceDetails && verbose) {
      console.log(`  ✓ Found offences: ${offenceDetails.mainOffence.subCategory.description}`)
    }

    // Create/update report in local database
    if (verbose) console.log(`  💾 Upserting report in local database...`)
    const result = await createReport(guid, defendantDetails, offenceDetails, connection, verbose)

    console.log(`  ✅ Successfully upserted report: ${result.id}`)
    stats.created++
  } catch (error) {
    console.error(`  ❌ Failed to process ${guid}:`, error instanceof Error ? error.message : String(error))
    stats.failed++
    stats.errors.push({
      guid,
      error: error instanceof Error ? error.message : String(error),
    })
  } finally {
    stats.processed++
  }
}

// Function to process GUIDs in batches
async function processBatch(guids: string[], connection: any, stats: MigrationStats, verbose = false): Promise<void> {
  const promises = guids.map(guid => processGUID(guid, connection, stats, verbose))
  await Promise.all(promises)
}


// Main migration function
async function migrateDeliusReports(limit?: number) {
  console.log('🚀 Starting Delius Report Migration\n')
  console.log('='.repeat(80))

  // Prompt for bearer token
  bearerToken = await promptForBearerToken()
  console.log('✓ Bearer token received\n')

  // Read GUIDs from CSV
  const allGuids = readGUIDs(CSV_FILE_PATH)
  const guids = limit ? allGuids.slice(0, limit) : allGuids

  console.log(
    `📁 Loaded ${allGuids.length} GUIDs from CSV${limit ? ` (processing ${guids.length} records)` : ''}\n`
  )

  if (guids.length === 0) {
    console.log('❌ No GUIDs found in CSV file')
    return
  }

  // Connect to database
  console.log('🔌 Connecting to database...')
  console.log(`   Host: ${config.db.server}`)
  console.log(`   Port: ${config.db.port || 5432}`)
  console.log(`   Database: ${config.db.database}`)
  console.log(`   Schema: ${config.db.schema}`)
  console.log(`   Username: ${config.db.username}`)

  const connection = await createConnection({
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
    synchronize: false,
    logging: false,
  })

  console.log('✓ Database connected successfully\n')
  console.log('='.repeat(80))

  const stats: MigrationStats = {
    total: guids.length,
    processed: 0,
    created: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  }

  try {
    // Process all GUIDs in batches
    for (let i = 0; i < guids.length; i += BATCH_SIZE) {
      const batch = guids.slice(i, Math.min(i + BATCH_SIZE, guids.length))
      console.log(
        `\n🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(guids.length / BATCH_SIZE)} (${batch.length} records)`
      )
      console.log('-'.repeat(80))

      await processBatch(batch, connection, stats, false)

      // Show progress
      const progress = ((stats.processed / stats.total) * 100).toFixed(1)
      console.log(
        `\n📊 Progress: ${stats.processed}/${stats.total} (${progress}%) - Upserted: ${stats.created}, Skipped: ${stats.skipped}, Failed: ${stats.failed}`
      )
    }
  } finally {
    await connection.close()
    console.log('\n✓ Database connection closed')
  }

  // Print summary
  console.log('\n' + '='.repeat(80))
  console.log('📊 Migration Summary')
  console.log('='.repeat(80))
  console.log(`Total GUIDs:       ${stats.total}`)
  console.log(`Processed:         ${stats.processed}`)
  console.log(`Upserted:          ${stats.created}`)
  console.log(`Skipped:           ${stats.skipped}`)
  console.log(`Failed:            ${stats.failed}`)

  if (stats.errors.length > 0) {
    console.log('\n❌ Errors:')
    stats.errors.forEach(({ guid, error }) => {
      console.log(`  • ${guid}: ${error}`)
    })
  }

  console.log('\n✅ Migration completed!')
}

// Run the migration script
const args = process.argv.slice(2)

// Parse --limit argument
let limit: number | undefined
const limitIndex = args.indexOf('--limit')
if (limitIndex !== -1 && args[limitIndex + 1]) {
  limit = parseInt(args[limitIndex + 1], 10)
  if (isNaN(limit) || limit <= 0) {
    console.error('❌ --limit must be a positive number')
    process.exit(1)
  }
  console.log(`⚙️  Limit set to ${limit} records\n`)
}

migrateDeliusReports(limit)
  .then(() => {
    console.log('\n✨ Script completed successfully')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n💥 Script failed:', error)
    process.exit(1)
  })
