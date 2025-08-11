import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialSetup1754560828491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
            "eventNumber"          TEXT NULL DEFAULT NULL,
            "lastUpdated"          TEXT,
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
        INSERT INTO field (name)
        VALUES ('name'),
               ('dateOfBirth'),
               ('crn'),
               ('pnc'),
               ('offencesUnderConsideration'),
               ('offencesPattern'),
               ('riskToChildren'),
               ('riskToPublic'),
               ('riskToKnownAdults'),
               ('riskToStaff'),
               ('riskPredictors'),
               ('riskAndHarmFactors'),
               ('defendantBehaviour'),
               ('proposedSentence'),
               ('proposedSentenceRationale'),
               ('alternativeSentencingOptions'),
               ('sentenceImpact'),
               ('address-pos'),
               ('address-number'),
               ('address-streetName'),
               ('address-town'),
               ('address-district'),
               ('address-county'),
               ('address-postcode');
    `)

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
               (1, 24);
        `)
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
