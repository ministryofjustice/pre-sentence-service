import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAddressAndProbationSourcesOfInformation1777200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO presentenceservice.sources_of_information (name, value, "isDefault", source, "createdAt", "createdBy", "lastUpdatedAt", "lastUpdatedBy", "isDeleted", version)
      VALUES
        ('address_enquiries', 'Address enquiries', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('probation_records', 'Probation records', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1);
    `)

    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET value = 'Diversity and inclusion form (DIF)',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'equality_information_form';
    `)

    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET value = 'Domestic abuse enquiries',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'domestic_abuse_callout_information';
    `)

    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET value = 'Safeguarding enquiries',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'safeguarding_checks';
    `)

    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET "isDefault" = false,
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'service_records';
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET "isDefault" = true,
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'service_records';
    `)

    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET value = 'Safeguarding checks',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'safeguarding_checks';
    `)

    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET value = 'Domestic abuse callout information',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'domestic_abuse_callout_information';
    `)

    await queryRunner.query(`
      UPDATE presentenceservice.sources_of_information
      SET value = 'Equality information form',
          "lastUpdatedAt" = CURRENT_TIMESTAMP::TEXT,
          "lastUpdatedBy" = 'system'
      WHERE name = 'equality_information_form';
    `)

    await queryRunner.query(`
      DELETE FROM presentenceservice.sources_of_information
      WHERE name IN ('address_enquiries', 'probation_records');
    `)
  }
}
