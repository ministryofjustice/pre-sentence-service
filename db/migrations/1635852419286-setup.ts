import { MigrationInterface, QueryRunner } from 'typeorm'

export class Setup1635852419286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report_definition
        (
            id      SERIAL PRIMARY KEY,
            type    TEXT    NOT NULL,
            version INTEGER NOT NULL DEFAULT 1,
            fields  SERIAL
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS field
        (
            id         SERIAL PRIMARY KEY,
            type       TEXT    NOT NULL,
            name       TEXT    NOT NULL,
            required   BOOLEAN NOT NULL DEFAULT false,
            validation TEXT
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report_definition_fields
        (
            id                   SERIAL PRIMARY KEY,
            report_definition_id INTEGER REFERENCES report_definition (id),
            field_id             INTEGER NOT NULL UNIQUE,
            FOREIGN KEY (field_id) REFERENCES field (id)
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report
        (
            id                   UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
            report_definition_id INTEGER NOT NULL UNIQUE,
            status               TEXT    NOT NULL DEFAULT 'NOT_STARTED',
            FOREIGN KEY (report_definition_id) REFERENCES report_definition (id)
        );
    `)

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS field_value
        (
            id        SERIAL PRIMARY KEY,
            report_id UUID    NOT NULL UNIQUE,
            field_id  INTEGER NOT NULL UNIQUE,
            value     TEXT,
            version   INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (report_id) REFERENCES report (id),
            FOREIGN KEY (field_id) REFERENCES field (id)
        );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
