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
            type: 'int',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'sigla',
            type: 'varchar',
          },
          {
            name: 'gentiligo',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('estados');
  }
}
