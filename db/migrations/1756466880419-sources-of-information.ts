import { MigrationInterface, QueryRunner } from 'typeorm'

export class SourcesOfInformation1756466880419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO field (name)
      VALUES ('sourcesOfInformation');
    `)

    await queryRunner.query(`
      INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
      VALUES (1, 26);
    `)

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS sources (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL,
        label TEXT NOT NULL,
        "reportId" UUID NULL REFERENCES report(id) ON DELETE CASCADE
      );
    `)

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uq_sources_custom_per_report
      ON sources ("reportId", key)
      WHERE "reportId" IS NOT NULL;
    `)

    await queryRunner.query(`
      INSERT INTO sources (key, label, "reportId")
      VALUES
        ('cps_summary', 'CPS summary', NULL),
        ('domestic_abuse_callout_information', 'Domestic abuse callout information', NULL),
        ('diversity_inclusion_form', 'Diversity Information Form (DIF)', NULL),
        ('interview', 'Interview', NULL),
        ('oasys_assessments', 'OASys assessments', NULL),
        ('previous_convictions', 'Previous convictions', NULL),
        ('safeguarding_checks', 'Safeguarding checks', NULL),
        ('sentencing_guidelines', 'Sentencing guidelines', NULL),
        ('service_records', 'Service records', NULL),
        ('substance_misuse_screening_tool', 'Substance misuse screening tool', NULL),
        ('victim_statement', 'Victim statement', NULL);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
