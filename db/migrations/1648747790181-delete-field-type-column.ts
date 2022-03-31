import { MigrationInterface, QueryRunner } from 'typeorm'

export class DeleteFieldTypeColumn1648747790181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE field
            DROP COLUMN type;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
