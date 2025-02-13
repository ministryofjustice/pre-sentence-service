import { MigrationInterface, QueryRunner } from 'typeorm'

export class SetupIntegration1647534413410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.report
            ADD COLUMN "entityId" text NULL DEFAULT NULL;
    `)

    await queryRunner.query(`
        UPDATE
            public.report
        SET "entityId" = '41'
        WHERE id = '0a15ce57-c46e-4b71-84f0-49dbed4bb81e';
    `)

    await queryRunner.query(`
        UPDATE
            public.report
        SET "entityId" = '42'
        WHERE id = '0877ed35-e59a-4e94-b2bd-5d2283dd7dd7';
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
