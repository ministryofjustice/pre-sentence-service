import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedReportData1642090824185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO field_value ("reportId", "fieldId", "value", "version")
        VALUES ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 1, 'Lenore Marquez', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 2, '12/04/1973', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 3, 'A12345B', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 6, 'Sheffield Magistrates Court', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 7, 'South Yorkshire', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 8, '23', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 9, '01', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 10, '2022', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 11, 'Stealing mail bags. On 13th January 2022 the defendant stole mail bags from a mail van.', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 36, 'Arthur Author', 1),
               ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 37, 'Sheffield Probation Office', 1);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
