import { MigrationInterface, QueryRunner } from 'typeorm'

/*
  Delete Author and Office name
  Add age field and include in report definition
*/

export class CorrectData1647867595326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE
        FROM public.field_value
        WHERE id = 10;
    `)

    await queryRunner.query(`
        DELETE
        FROM public.field_value
        WHERE id = 11;
    `)

    await queryRunner.query(`
        INSERT INTO field (type, name, required)
        VALUES ('number', 'age', false);
    `)

    await queryRunner.query(`
        INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
        VALUES (1, 45);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
