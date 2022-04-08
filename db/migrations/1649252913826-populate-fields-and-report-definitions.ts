import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateFieldsAndReportDefinitions1649252913826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO field (name, required)
        VALUES ('issueAccommodationDetails', false),
               ('issueEmploymentDetails', false),
               ('issueFinanceDetails', false),
               ('issueRelationshipsDetails', false),
               ('issueSubstanceMisuseDetails', false),
               ('issueHealthDetails', false),
               ('issueBehaviourDetails', false),
               ('issueOtherDetails', false),
               ('experienceOfTraumaDetails', false),
               ('caringResponsibilitiesDetails', false),
               ('responseToPreviousSupervisionDetails', false),
               ('counterSignature', false);
    `)

    await queryRunner.query(`
        INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
        VALUES (2, 48),
               (2, 49),
               (2, 50),
               (2, 51),
               (2, 52),
               (2, 53),
               (2, 54),
               (2, 55),
               (2, 56),
               (2, 57),
               (2, 58),
               (2, 59);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
