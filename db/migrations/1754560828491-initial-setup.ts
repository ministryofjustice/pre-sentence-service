import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialSetup1754560828491 implements MigrationInterface {
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
            eventNumber          TEXT NULL DEFAULT NULL,
            lastUpdated          TEXT,
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

    await queryRunner.query(`
        INSERT INTO report_definition (type, version)
        VALUES ('psr', 1);
    `)

    await queryRunner.query(`
        INSERT INTO field (name, required)
        VALUES ('name', true),
               ('dateOfBirth', true),
               ('crn', true),
               ('pnc', false),
               ('address', false),
               ('offencesUnderConsideration', false),
               ('offencesPattern', false),
               ('riskToChildren', false),
               ('riskToPublic', false),
               ('riskToKnownAdults', false),
               ('riskToStaff', false),
               ('riskPredictors', false),
               ('riskAndHarmFactors', false),
               ('defendantBehaviour', false),
               ('proposedSentence', false),
               ('proposedSentenceRationale', false),
               ('alternativeSentencingOptions', false),
               ('sentenceImpact', false),
               ('address-pos', false),
               ('address-number', false),
               ('address-streetName', false),
               ('address-town', false),
               ('address-district', false),
               ('address-county', false),
               ('address-postcode', false);
    `)
    // TODOLM: is address needed ?
    // TODOLM: required ?

    await queryRunner.query(`
        INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
        VALUES (1, 1),
               (1, 2),
               (1, 3),
               (1, 4),
               (1, 5),
               (1, 6),
               (1, 7),
               (1, 8),
               (1, 9),
               (1, 10),
               (1, 11),
               (1, 12),
               (1, 13),
               (1, 14),
               (1, 15),
               (1, 16),
               (1, 17),
               (1, 18),
               (1, 19),
               (1, 20),
               (1, 21),
               (1, 22),
               (1, 23),
               (1, 24),
               (1, 25);
        `)
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
