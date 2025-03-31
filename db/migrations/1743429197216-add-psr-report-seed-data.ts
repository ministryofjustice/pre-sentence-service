import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPsrReportSeedData1743429197216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO report (id, "reportDefinitionId")
            VALUES ('c6c4d313-c8c6-40dd-b415-8413cdf2eb6c', 3);
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
