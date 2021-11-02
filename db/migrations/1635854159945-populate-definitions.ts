import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateDefinitions1635854159945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO report_definition (type, version)
        VALUES ('record-of-oral', 1),
               ('short-format', 1);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
