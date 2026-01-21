import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateNewStructureTables1768557000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create schema if it doesn't exist
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS presentenceservice;
    `)

    // Create local_authorities table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.local_authorities (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        "createdAt" TEXT,
        "createdBy" TEXT,
        "lastUpdatedAt" TEXT,
        "lastUpdatedBy" TEXT,
        "isDeleted" BOOLEAN,
        version INTEGER
      );
    `)

    // Create sources_of_information table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.sources_of_information (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        value TEXT NOT NULL,
        "isDefault" BOOLEAN NOT NULL,
        source TEXT NOT NULL,
        "createdAt" TEXT,
        "createdBy" TEXT,
        "lastUpdatedAt" TEXT,
        "lastUpdatedBy" TEXT,
        "isDeleted" BOOLEAN,
        version INTEGER
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
        "createdAt" TIMESTAMP NOT NULL,
        "createdBy" TEXT NOT NULL,
        "lastUpdatedBy" TIMESTAMP NOT NULL,
        "isDeleted" BOOLEAN NOT NULL,
        version INTEGER
      );
    `)

    // Create report_details table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.report_details (
        id SERIAL PRIMARY KEY,
        "personId" INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'NOT_STARTED',
        origin TEXT NOT NULL,
        pages JSONB,
        "reportType" TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL,
        "createdBy" TEXT NOT NULL,
        "lastUpdatedBy" TIMESTAMP NOT NULL,
        "isDeleted" BOOLEAN NOT NULL,
        version INTEGER,
        FOREIGN KEY ("personId") REFERENCES presentenceservice.person_details(id)
      );
    `)

    // Create report_sources_of_information join table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.report_sources_of_information (
        id SERIAL PRIMARY KEY,
        "reportId" INTEGER NOT NULL,
        "sourcesOfInformationId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP NOT NULL,
        "createdBy" TEXT NOT NULL,
        "lastUpdatedAt" TIMESTAMP NOT NULL,
        "lastUpdatedBy" TEXT NOT NULL,
        "isDeleted" BOOLEAN NOT NULL,
        version INTEGER,
        FOREIGN KEY ("reportId") REFERENCES presentenceservice.report_details(id),
        FOREIGN KEY ("sourcesOfInformationId") REFERENCES presentenceservice.sources_of_information(id)
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order to respect foreign key constraints
    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.report_sources_of_information;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.report_details;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.person_details;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.sources_of_information;
    `)

    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.local_authorities;
    `)
  }
}
