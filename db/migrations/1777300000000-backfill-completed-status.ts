import { MigrationInterface, QueryRunner } from 'typeorm'

export class BackfillCompletedStatus1777300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE presentenceservice.report_details SET status = 'COMPLETED' WHERE "submittedAt" IS NOT NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE presentenceservice.report_details SET status = 'STARTED' WHERE status IN ('COMPLETED', 'LOCKED');
    `)
  }
}
