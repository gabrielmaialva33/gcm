import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOcorrencias1602217244453
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ocorrencias',
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
            name: 'data',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'atendente_id',
            type: 'uuid',
          },
          {
            name: 'natureza_inicial_id',
            type: 'uuid',
          },
          //! warn
          /* {
            name: 'natureza_final_id',
            type: 'uuid',
          }, */
          {
            name: 'endereco_id',
            type: 'uuid',
            comment: 'local da ocorrencia',
          },
          //! warn
          {
            name: 'solicitante',
            type: 'uuid',
            isNullable: true,
            comment: 'o solicitante pode ser anonimo',
          },
          {
            name: 'hora_chamada',
            type: 'timestamp with time zone',
          },
          {
            name: 'hora_despacho',
            type: 'timestamp with time zone',
          },
          {
            name: 'hora_final',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'historico',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'operacao',
            type: 'boolean',
            default: false,
          },
          {
            name: 'acidente',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'ativo',
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

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'ocorrencias',
      new TableForeignKey({
        name: 'gcm_fk',
        columnNames: ['atendente_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'gcms',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey naturezas_ocorrencias
    await queryRunner.createForeignKey(
      'ocorrencias',
      new TableForeignKey({
        name: 'natureza_ocorrencia_fk',
        columnNames: ['natureza_inicial_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'naturezas_ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey enderecos
    await queryRunner.createForeignKey(
      'ocorrencias',
      new TableForeignKey({
        name: 'endereco_fk',
        columnNames: ['endereco_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enderecos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey contatos
    await queryRunner.createForeignKey(
      'ocorrencias',
      new TableForeignKey({
        name: 'contato_fk',
        columnNames: ['solicitante'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contatos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ocorrencias', 'gcm_fk');
    await queryRunner.dropForeignKey('ocorrencias', 'natureza_ocorrencia_fk');
    await queryRunner.dropForeignKey('ocorrencias', 'endereco_fk');
    await queryRunner.dropForeignKey('ocorrencias', 'contato_fk');
    await queryRunner.dropTable('ocorrencias');
  }
}
