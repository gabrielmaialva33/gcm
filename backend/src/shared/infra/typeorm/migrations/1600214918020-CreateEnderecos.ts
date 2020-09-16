import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEnderecos1600214918020
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
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
            name: 'complemento',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar(15)',
            isNullable: true,
          },
          {
            name: 'codigo_endereco',
            type: 'varchar(6)',
            isNullable: true,
          },
          {
            name: 'bairro_id',
            type: 'uuid',
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

    //* -> foreignkey estados
    await queryRunner.createForeignKey(
      'enderecos',
      new TableForeignKey({
        name: 'bairro_fk',
        columnNames: ['bairro_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bairros',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('enderecos', 'bairro_fk');
    await queryRunner.dropTable('enderecos');
  }
}