import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateObjetos1602265303016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'objetos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'registro',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar(20)',
          },
          {
            name: 'marca',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'modelo',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'fabricacao',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'descricao',
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
    await queryRunner.dropTable('objetos');
  }
}
