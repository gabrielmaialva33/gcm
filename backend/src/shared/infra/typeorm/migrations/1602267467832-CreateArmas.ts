import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateArmas1602267467832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'armas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'modelo',
            type: 'varchar(20)',
          },
          {
            name: 'calibre',
            type: 'varchar(10)',
          },
          {
            name: 'numero',
            type: 'varchar(10)',
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: false,
          },
          {
            name: 'observacao',
            type: 'text',
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
    await queryRunner.dropTable('armas');
  }
}
