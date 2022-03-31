import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedReportData1648745665052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO field_value ("reportId", "fieldId", "value", "version")
        VALUES ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 1, 'Lenore Marquez', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 2, '18/08/1979', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 3, 'DX12340A', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 6, 'Sheffield Magistrates Court', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 7, 'South Yorkshire', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 8, '23', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 9, '01', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 10, '2022', 1),
               ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 11, 'Stealing mail bags. On 13th January 2022 the defendant stole mail bags from a mail van.', 1);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
