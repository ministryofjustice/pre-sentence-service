import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddReportUpdated1660127156400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE report
            ADD "lastUpdated" TEXT;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
