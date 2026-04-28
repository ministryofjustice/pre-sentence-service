import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropLegacyPublicTables1777100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.report_definition_fields CASCADE;`)
    await queryRunner.query(`DROP TABLE IF EXISTS public.field_value CASCADE;`)
    await queryRunner.query(`DROP TABLE IF EXISTS public.report CASCADE;`)
    await queryRunner.query(`DROP TABLE IF EXISTS public.report_definition CASCADE;`)
    await queryRunner.query(`DROP TABLE IF EXISTS public.field CASCADE;`)
    await queryRunner.query(`DROP TABLE IF EXISTS public.sources CASCADE;`)
  }

  public async down(): Promise<void> {
    // No down migration: legacy tables are intentionally dropped and will not be recreated.
  }
}
