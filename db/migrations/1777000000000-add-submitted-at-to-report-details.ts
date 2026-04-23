import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSubmittedAtToReportDetails1777000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE presentenceservice.report_details
        ADD COLUMN IF NOT EXISTS "submittedAt" TIMESTAMP NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE presentenceservice.report_details
        DROP COLUMN IF EXISTS "submittedAt";
    `)
  }
}
