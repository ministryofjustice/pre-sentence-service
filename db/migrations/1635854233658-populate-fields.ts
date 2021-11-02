import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateFields1635854233658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO field (type, name, required)
        VALUES ('text', 'name', true),
               ('text', 'dateOfBirth', true),
               ('text', 'crn', true),
               ('text', 'pnc', false),
               ('text', 'address', false);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
