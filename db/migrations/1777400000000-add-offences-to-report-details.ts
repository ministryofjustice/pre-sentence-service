import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddOffencesToReportDetails1777400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE presentenceservice.report_details
        ADD COLUMN IF NOT EXISTS "offences" JSONB NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE presentenceservice.report_details
        DROP COLUMN IF EXISTS "offences";
    `)
  }
}
