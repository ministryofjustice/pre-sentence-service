import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAddressAndProbationSourcesOfInformation1777200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO presentenceservice.sources_of_information (name, value, "isDefault", source, "createdAt", "createdBy", "lastUpdatedAt", "lastUpdatedBy", "isDeleted", version)
      VALUES
        ('address_enquiries', 'Address enquiries', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('probation_records', 'Probation records', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM presentenceservice.sources_of_information
      WHERE name IN ('address_enquiries', 'probation_records');
    `)
  }
}
