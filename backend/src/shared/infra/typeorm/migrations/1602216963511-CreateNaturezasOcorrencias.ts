import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateNaturezasOcorrencias1602216963511
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'naturezas_ocorrencias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo_natureza',
            type: 'varchar(3)',
          },
          {
            name: 'natureza',
            type: 'varchar(20)',
          },
          {
            name: 'criminal',
            type: 'boolean',
            default: true,
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
    await queryRunner.dropTable('naturezas_ocorrencias');
  }
}
