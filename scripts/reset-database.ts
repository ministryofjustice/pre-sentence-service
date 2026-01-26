import { createConnection } from 'typeorm'
import config from '../server/config'
import fs from 'fs'

async function resetDatabase() {
  console.log('Connecting to database...')

  const connection = await createConnection({
    type: 'postgres',
    host: String(config.db.server),
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
    synchronize: false,
    logging: false,
  })

  try {
    console.log('Terminating active connections to the database...')

    // Terminate all active connections except our own
    await connection.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${String(config.db.database)}'
        AND pid <> pg_backend_pid();
    `)

    console.log('Dropping presentenceservice schema...')
    await connection.query(`DROP SCHEMA IF EXISTS presentenceservice CASCADE;`)

    console.log('Dropping public schema...')
    await connection.query(`DROP SCHEMA IF EXISTS public CASCADE;`)

    console.log('Recreating schemas...')
    await connection.query(`CREATE SCHEMA public;`)
    await connection.query(`CREATE SCHEMA presentenceservice;`)

    await connection.query(`GRANT ALL ON SCHEMA public TO "${String(config.db.username)}";`)
    await connection.query(`GRANT ALL ON SCHEMA public TO public;`)

    await connection.query(`GRANT ALL ON SCHEMA presentenceservice TO "${String(config.db.username)}";`)

    console.log('Creating uuid-ossp extension...')

    // Create the uuid-ossp extension for UUID support
    await connection.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

    console.log('Schemas dropped and recreated successfully!')
    console.log('\nNext steps:')
    console.log('  1. Start the app (migrations will run automatically): npm run start:dev')
    console.log('  2. OR seed test data directly: npm run seed-test-data')
  } catch (error) {
    console.error('Error resetting database:', error)
    throw error
  } finally {
    await connection.close()
    console.log('\nDatabase connection closed.')
  }
}

// Run the reset script
resetDatabase()
  .then(() => {
    console.log('\nScript completed successfully')
    process.exit(0)
  })
  .catch(error => {
    console.error('\nScript failed:', error)
    process.exit(1)
  })
