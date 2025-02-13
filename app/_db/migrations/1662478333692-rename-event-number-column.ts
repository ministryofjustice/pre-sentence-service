import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameEventNumberColumn1662478333692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE report
            RENAME COLUMN "entityId" TO "eventNumber";
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
