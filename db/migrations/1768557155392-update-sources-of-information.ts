import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateSourcesOfInformation1768557155392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update 'diversity_inclusion_form' to 'equality_information_form'
    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET name = 'equality_information_form',
          value = 'Equality information form',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'diversity_inclusion_form';
    `)

    // Delete 'substance_misuse_screening_tool' as it's not in the Figma design
    await queryRunner.query(`
      -- First, delete any references in report_sources_of_information
      DELETE FROM presentenceservice.report_sources_of_information
      WHERE "sourcesOfInformationId" IN (
        SELECT id FROM presentenceservice.sources_of_information
        WHERE name = 'substance_misuse_screening_tool'
      );
    `)

    await queryRunner.query(`
      -- Then delete the source itself
      DELETE FROM presentenceservice.sources_of_information
      WHERE name = 'substance_misuse_screening_tool';
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert 'equality_information_form' back to 'diversity_inclusion_form'
    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET name = 'diversity_inclusion_form',
          value = 'Diversity Information Form (DIF)',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'equality_information_form';
    `)

    // Re-add 'substance_misuse_screening_tool'
    await queryRunner.query(`
      INSERT INTO presentenceservice.sources_of_information (name, value, "isDefault", source, "createdAt", "createdBy", "lastUpdatedAt", "lastUpdatedBy", "isDeleted", version)
      VALUES
        ('substance_misuse_screening_tool', 'Substance misuse screening tool', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1);
    `)
  }
}
