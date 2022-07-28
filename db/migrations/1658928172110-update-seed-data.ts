import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateSeedData1658928172110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE field_value
        SET "value" = 'X320741'
        WHERE id = 3;
    `)

    await queryRunner.query(`
        UPDATE field_value
        SET "value" = 'X320741'
        WHERE id = 14;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
