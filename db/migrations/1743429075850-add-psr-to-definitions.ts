import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPsrToDefinitions1743429075850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO report_definition (type, version)
            VALUES ('psr', 1);
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
