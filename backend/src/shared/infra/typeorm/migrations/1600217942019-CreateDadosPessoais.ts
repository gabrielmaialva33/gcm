import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDadosPessoais1600217942019
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //* this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'dados_pessoais',
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
            type: 'varchar(40)',
          },
          {
            name: 'rg',
            type: 'varchar(15)',
            isUnique: true,
          },
          {
            name: 'cpf',
            type: 'varchar(15)',
            isUnique: true,
          },
          {
            name: 'telefone',
            type: 'varchar(20)[]',
            isNullable: true,
          },
          {
            name: 'celular',
            type: 'varchar(20)[]',
            isNullable: true,
          },
          {
            name: 'nome_mae',
            type: 'varchar(40)',
          },
          {
            name: 'nome_pai',
            type: 'varchar(40)',
            isNullable: true,
          },
          {
            name: 'data_nascimento',
            type: 'date',
          },
          //! warn
          {
            name: 'municipio_nascimento_id',
            type: 'uuid',
          },
          {
            name: 'sexo',
            type: 'varchar(10)',
          },
          {
            name: 'nacionalidade',
            type: 'varchar(15)',
            isNullable: true,
          },
          {
            name: 'naturalidade',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'estado_civil',
            type: 'varchar(11)',
            isNullable: true,
          },
          {
            name: 'profissao',
            type: 'varchar(30)[]',
          },
          {
            name: 'escolaridade',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nome_conjulge',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'nome_filhos',
            type: 'varchar(20)[]',
            isNullable: true,
          },
          {
            name: 'titulo_eleitor',
            type: 'varchar(15)',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'zona_eleitoral',
            type: 'varchar(7)',
            isNullable: true,
          },
          {
            name: 'cnh',
            type: 'varchar(15)',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'validade_cnh',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'observacao',
            type: 'text',
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
      'dados_pessoais',
      new TableForeignKey({
        name: 'municipio_nascimento_fk',
        columnNames: ['municipio_nascimento_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cidades',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'dados_pessoais',
      'municipio_nascimento_fk',
    );
    await queryRunner.dropTable('dados_pessoais');
  }
}
