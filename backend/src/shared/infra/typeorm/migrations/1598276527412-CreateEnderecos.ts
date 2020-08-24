import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEnderecos1598276527412
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'enderecos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'logradouro',
            type: 'varchar(100)',
          },
          {
            name: 'numero',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'complemento',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'cidade',
            type: 'varchar(40)',
          },
          {
            name: 'estado',
            type: 'varchar(2)',
          },
          {
            name: 'cep',
            type: 'varchar(15)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: ' timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: ' timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('enderecos');
  }
}
