import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateReportStatusHistory1777310000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS presentenceservice.report_status_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "reportId" UUID NOT NULL,
        "previousStatus" TEXT,
        "newStatus" TEXT NOT NULL,
        "changedBy" TEXT NOT NULL,
        "changedAt" TIMESTAMP NOT NULL DEFAULT now(),
        FOREIGN KEY ("reportId") REFERENCES presentenceservice.report_details(id)
      );
    `)

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_report_status_history_reportId" ON presentenceservice.report_status_history ("reportId");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS presentenceservice.report_status_history;
    `)
  }
}
