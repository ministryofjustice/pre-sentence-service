import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateFieldsAndReportDefinitions1641832115936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO field (type, name, required)
        VALUES ('text', 'court', true),
               ('text', 'localJusticeArea', true),
               ('date', 'dateOfHearing', true),
               ('text', 'mainOffence', true),
               ('text', 'otherOffences', false),
               ('text', 'offenceAnalysis', true),
               ('radio', 'patternOfOffendingBehaviour', true),
               ('radio', 'escalationInSeriousness', true),
               ('checkbox', 'assessmentFactors', true),
               ('radio', 'experienceOfTrauma', true),
               ('radio', 'caringResponsibilities', true),
               ('text', 'evidenceForAssessment', true),
               ('text', 'assessmentTool1', true),
               ('radio', 'assessmentLevel1', true),
               ('text', 'assessmentTool2', false),
               ('radio', 'assessmentLevel2', false),
               ('text', 'assessmentTool3', false),
               ('radio', 'assessmentLevel3', false),
               ('text', 'assessmentTool4', false),
               ('radio', 'assessmentLevel4', false),
               ('text', 'yourAssessment', true),
               ('radio', 'riskOfSeriousHarm', true),
               ('text', 'evidenceForRiskLevel', true),
               ('radio', 'responseToPreviousSupervision', true),
               ('radio', 'equalityAndDiversity', true),
               ('text', 'proposal', true),
               ('checkbox', 'sourcesOfInformation', true),
               ('text', 'otherSourceOfInformation', false),
               ('text', 'reportAuthor', true),
               ('text', 'office', true),
               ('text', 'officePhoneNumber', true),
               ('date', 'startDate', true),
               ('date', 'completionDate', true);
    `)

    await queryRunner.query(`
        INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
        VALUES (1, 6),
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
               (1, 25),
               (1, 26),
               (1, 27),
               (1, 28),
               (1, 29),
               (1, 30),
               (1, 31),
               (1, 32),
               (1, 33),
               (1, 34),
               (1, 35),
               (1, 36),
               (1, 37),
               (1, 38);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
