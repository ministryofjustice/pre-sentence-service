import { MigrationInterface, QueryRunner } from 'typeorm'

export class Setup1635852419286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS report;
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report_definition
        (
            id      SERIAL PRIMARY KEY,
            type    TEXT,
            version INTEGER NOT NULL DEFAULT 1
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS field
        (
            id         SERIAL PRIMARY KEY,
            type       TEXT,
            name       TEXT,
            required   BOOLEAN NOT NULL DEFAULT false,
            validation TEXT
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report_definition_fields
        (
            id                   SERIAL PRIMARY KEY,
            "reportDefinitionId" INTEGER NOT NULL,
            "fieldId"            INTEGER NOT NULL,
            FOREIGN KEY ("reportDefinitionId") REFERENCES report_definition (id),
            FOREIGN KEY ("fieldId") REFERENCES field (id)
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report
        (
            id                   UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
            "reportDefinitionId" INTEGER NOT NULL,
            status               TEXT    NOT NULL DEFAULT 'NOT_STARTED',
            FOREIGN KEY ("reportDefinitionId") REFERENCES report_definition (id)
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS field_value
        (
            id         SERIAL PRIMARY KEY,
            "reportId" UUID    NOT NULL,
            "fieldId"  INTEGER NOT NULL,
            value      TEXT,
            version    INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY ("reportId") REFERENCES report (id),
            FOREIGN KEY ("fieldId") REFERENCES field (id)
        );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
