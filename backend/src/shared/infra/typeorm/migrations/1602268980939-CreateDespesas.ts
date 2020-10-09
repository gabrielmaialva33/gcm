import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDespesas1602268980939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'despesas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pecas_vtr',
            type: 'float(11)',
            isNullable: true,
          },
          {
            name: 'gasolina_vtr',
            type: 'float(11)',
            isNullable: true,
          },
          {
            name: 'utencilios',
            type: 'float(11)',
            isNullable: true,
          },
          {
            name: 'armamento',
            type: 'float(11)',
            isNullable: true,
          },
          {
            name: 'municao',
            type: 'float(11)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('despesas');
  }
}
