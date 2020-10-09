import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAlmoxarifado1602268215043
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'almoxarifado',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar(20)',
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'valor',
            type: 'float(7)',
            isNullable: true,
          },
          {
            name: 'entrada',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'saida',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'estoque',
            type: 'int',
          },
          {
            name: 'valor_total',
            type: 'float(11)',
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
    await queryRunner.dropTable('almoxarifado');
  }
}
