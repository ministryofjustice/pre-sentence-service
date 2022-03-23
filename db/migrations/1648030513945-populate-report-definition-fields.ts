import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateReportDefinitionFields1648030513945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
        VALUES (2, 1),
               (2, 2),
               (2, 3),
               (2, 4),
               (2, 5),
               (2, 6),
               (2, 7),
               (2, 8),
               (2, 9),
               (2, 10),
               (2, 11),
               (2, 12);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
