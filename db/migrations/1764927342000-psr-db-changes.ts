import { MigrationInterface, QueryRunner } from 'typeorm'

export class PsrDbChanges1764927342000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create local_authorities table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.local_authorities (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        "createdAt" TEXT,
        "createdBy" TEXT,
        "lastUpdatedAt" TEXT,
        "lastUpdatedBy" TEXT,
        "isDeleted" BOOLEAN DEFAULT FALSE,
        version INTEGER DEFAULT 1
      );
    `)

    // Create person_details table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.person_details (
        id SERIAL PRIMARY KEY,
        crn TEXT NOT NULL,
        names JSONB NOT NULL,
        "dateOfBirth" TIMESTAMP NOT NULL,
        pnc TEXT NOT NULL,
        address JSONB,
        "mainOffence" TEXT NOT NULL,
        "otherOffences" JSONB,
        court JSONB NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "createdBy" TEXT NOT NULL,
        "lastUpdatedBy" TIMESTAMP NOT NULL DEFAULT NOW(),
        "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
        version INTEGER DEFAULT 1
      );
    `)

    // Create report_details table with enum
    await queryRunner.query(`
      CREATE TYPE presentenceservice.report_status AS ENUM ('NOT_STARTED', 'STARTED');
    `)

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.report_details (
        id SERIAL PRIMARY KEY,
        "personId" INTEGER NOT NULL,
        status presentenceservice.report_status NOT NULL DEFAULT 'NOT_STARTED',
        origin TEXT NOT NULL,
        pages JSONB,
        "reportType" TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "createdBy" TEXT NOT NULL,
        "lastUpdatedBy" TIMESTAMP NOT NULL DEFAULT NOW(),
        "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
        version INTEGER DEFAULT 1,
        FOREIGN KEY ("personId") REFERENCES presentenceservice.person_details(id)
      );
    `)

    // Create sources_of_information table (reference data)
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.sources_of_information (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        value TEXT NOT NULL,
        "isDefault" BOOLEAN NOT NULL DEFAULT FALSE,
        source TEXT NOT NULL,
        "createdAt" TEXT,
        "createdBy" TEXT,
        "lastUpdatedAt" TEXT,
        "lastUpdatedBy" TEXT,
        "isDeleted" BOOLEAN DEFAULT FALSE,
        version INTEGER DEFAULT 1
      );
    `)

    // Create report_sources_of_information junction table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.report_sources_of_information (
        id SERIAL PRIMARY KEY,
        "reportId" INTEGER NOT NULL,
        "sourcesOfInformationId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "createdBy" TEXT NOT NULL,
        "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "lastUpdatedBy" TIMESTAMP NOT NULL DEFAULT NOW(),
        "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
        version INTEGER DEFAULT 1,
        FOREIGN KEY ("reportId") REFERENCES presentenceservice.report_details(id),
        FOREIGN KEY ("sourcesOfInformationId") REFERENCES presentenceservice.sources_of_information(id)
      );
    `)

    // Create indexes for better query performance
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_person_details_crn
      ON presentenceservice.person_details(crn);
    `)

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_report_details_person_id
      ON presentenceservice.report_details("personId");
    `)

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_report_sources_report_id
      ON presentenceservice.report_sources_of_information("reportId");
    `)

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_report_sources_source_id
      ON presentenceservice.report_sources_of_information("sourcesOfInformationId");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`
      DROP INDEX IF EXISTS presentenceservice.idx_report_sources_source_id;
    `)

    await queryRunner.query(`
      DROP INDEX IF EXISTS presentenceservice.idx_report_sources_report_id;
    `)

    await queryRunner.query(`
      DROP INDEX IF EXISTS presentenceservice.idx_report_details_person_id;
    `)

    await queryRunner.query(`
      DROP INDEX IF EXISTS presentenceservice.idx_person_details_crn;
    `)

    // Drop tables in reverse order (to respect foreign key constraints)
    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.report_sources_of_information;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.sources_of_information;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.report_details;
    `)

    await queryRunner.query(`
      DROP TYPE IF EXISTS presentenceservice.report_status;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.person_details;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.local_authorities;
    `)
  }
}
