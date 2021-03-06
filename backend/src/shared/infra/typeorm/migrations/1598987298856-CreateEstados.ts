import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEstados1598987298856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'estados',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo_ibge',
            type: 'varchar(2)',
          },
          {
            name: 'uf',
            type: 'varchar(50)',
          },
          {
            name: 'sigla',
            type: 'varchar(2)',
          },
          {
            name: 'gentilico',
            type: 'varchar(100)',
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
    await queryRunner.dropTable('estados');
  }
}
