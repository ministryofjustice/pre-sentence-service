import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedReportData1754575736909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DO $$
        DECLARE
            report_id UUID := 'd97277dd-1b0a-4853-b13b-8afed046bb8a';
            report_definition_id INTEGER;
            field_list TEXT[][] := ARRAY[
                ['name', 'John Doe'],
                ['dateOfBirth', '18/08/1979'],
                ['crn', 'X320741'],
                ['pnc', '2000/0002697F'],
                ['offencesUnderConsideration', 'Offences under consideration'],
                ['offencesPattern', 'Pattern of offences'],
                ['noPreviousOffences', 'true'],
                ['riskToChildren', 'low'],
                ['riskToPublic', 'medium'],
                ['riskToKnownAdults', 'high'],
                ['riskToStaff', 'very_high'],
                ['riskPredictors', 'Key risk predictors'],
                ['riskAndHarmFactors', 'Factors contributing to risk and harm'],
                ['defendantBehaviour', 'Observed behaviour of defendant'],
                ['proposedSentence', 'Suggested sentence'],
                ['proposedSentenceRationale', 'Rationale for proposed sentence'],
                ['alternativeSentencingOptions', 'Other sentencing options considered'],
                ['sentenceImpact', 'Potential impact of sentence'],
                ['address-pos', 'Greenfield House'],
                ['address-number', '32'],
                ['address-streetName', 'Scotland street'],
                ['address-town', 'Sheffield'],
                ['address-district', 'Sheffield City Centre'],
                ['address-county', 'South Yorkshire'],
                ['address-postcode', 'S3 7BS']
                ];
        BEGIN
            SELECT id INTO report_definition_id
            FROM report_definition
            WHERE type = 'psr';
            
            IF NOT EXISTS (SELECT 1 FROM report WHERE id = report_id) THEN
                INSERT INTO report (id, "reportDefinitionId", status)
                VALUES (
                    report_id,
                    report_definition_id,
                    'NOT_STARTED'
                );
            END IF;

            FOR i IN 1..array_length(field_list, 1) LOOP
                INSERT INTO field_value ("reportId", "fieldId", value)
                SELECT
                    report_id,
                    f.id,
                    field_list[i][2]
                FROM field f
                WHERE f.name = field_list[i][1];

            END LOOP;
        END $$;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM field_value WHERE "reportId" = 'd97277dd-1b0a-4853-b13b-8afed046bb8a';
            DELETE FROM report WHERE id = 'd97277dd-1b0a-4853-b13b-8afed046bb8a';
        `)
  }
}
