import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateReportDefinitionFields1635854322522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
        VALUES (1, 1),
               (1, 2),
               (1, 3),
               (1, 4),
               (1, 5);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
