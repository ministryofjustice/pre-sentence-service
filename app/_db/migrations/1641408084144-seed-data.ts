import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedData1641408084144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO report (id, "reportDefinitionId")
        VALUES ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 2);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
