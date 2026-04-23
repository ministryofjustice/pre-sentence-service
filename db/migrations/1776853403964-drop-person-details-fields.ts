import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropPersonDetailsFields1776853403964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE presentenceservice.person_details
        DROP COLUMN IF EXISTS names,
        DROP COLUMN IF EXISTS "dateOfBirth",
        DROP COLUMN IF EXISTS pnc,
        DROP COLUMN IF EXISTS address,
        DROP COLUMN IF EXISTS "mainOffence",
        DROP COLUMN IF EXISTS "otherOffences",
        DROP COLUMN IF EXISTS court;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE presentenceservice.person_details
        ADD COLUMN IF NOT EXISTS names JSONB,
        ADD COLUMN IF NOT EXISTS "dateOfBirth" TIMESTAMP,
        ADD COLUMN IF NOT EXISTS pnc TEXT,
        ADD COLUMN IF NOT EXISTS address JSONB,
        ADD COLUMN IF NOT EXISTS "mainOffence" TEXT,
        ADD COLUMN IF NOT EXISTS "otherOffences" JSONB,
        ADD COLUMN IF NOT EXISTS court JSONB;
    `)
  }
}
