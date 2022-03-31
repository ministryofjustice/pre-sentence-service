import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateFieldsAndReportDefinitions1648743900043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO field (type, name, required)
        VALUES ('text', 'offenceSummary', true),
               ('text', 'likelihoodOfReOffending', true);
    `)

    await queryRunner.query(`
        INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
        VALUES (2, 13),
               (2, 14),
               (2, 16),
               (2, 17),
               (2, 18),
               (2, 29),
               (2, 31),
               (2, 32),
               (2, 33),
               (2, 34),
               (2, 35),
               (2, 36),
               (2, 37),
               (2, 38),
               (2, 39),
               (2, 40),
               (2, 41),
               (2, 42),
               (2, 43),
               (2, 44),
               (2, 45),
               (2, 46),
               (2, 47);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
