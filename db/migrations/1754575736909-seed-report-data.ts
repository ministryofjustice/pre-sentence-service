import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedReportData1754575736909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM field_value WHERE "reportId" = 'd97277dd-1b0a-4853-b13b-8afed046bb8a';
            DELETE FROM report WHERE id = 'd97277dd-1b0a-4853-b13b-8afed046bb8a';
            DELETE FROM report_definition_fields WHERE "reportDefinitionId" = 1;

            INSERT INTO report (id, "reportDefinitionId", status) VALUES ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 1, 'NOT_STARTED');

            INSERT INTO field_value ("reportId", "fieldId", value) VALUES
                ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 1, 'John Doe'),
                ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 2, '18/08/1979'),
                ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 3, 'X320741'),
                ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 5, '99 Some Lane, somewhere, SO2 3ME');

            DO $$
            DECLARE
                fixed_report_id UUID := 'd97277dd-1b0a-4853-b13b-8afed046bb8a';
                fixed_report_definition_id INT := 1;
                field_list TEXT[][] := ARRAY[
                ['offencesUnderConsideration', 'Offences under consideration'],
                ['offencesPattern', 'Pattern of offences'],
                ['riskToChildren', 'Low risk'],
                ['riskToPublic', 'Medium risk'],
                ['riskToKnownAdults', 'High risk'],
                ['riskToStaff', 'Very high risk'],
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
                FOR i IN 1..array_length(field_list, 1) LOOP
                DELETE FROM field WHERE name = field_list[i][1];

                WITH new_field AS (
                    INSERT INTO field (name) VALUES (field_list[i][1])
                    RETURNING id
                ),
                insert_field_value AS (
                    INSERT INTO field_value ("reportId", "fieldId", value)
                    SELECT fixed_report_id, id, field_list[i][2] FROM new_field
                )
                INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
                SELECT fixed_report_definition_id, id FROM new_field;
                END LOOP;
            END;
            $$ LANGUAGE plpgsql;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
