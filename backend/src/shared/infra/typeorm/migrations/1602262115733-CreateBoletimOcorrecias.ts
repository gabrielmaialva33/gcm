import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBoletimOcorrecias1602262115733
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bo_ocorrencias',
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
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'ocorrencia_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'endereco_id',
            type: 'uuid',
            comment: 'local',
          },
          {
            name: 'natureza_ocorrencia_id',
            type: 'uuid',
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

    //* -> foreignkey ocorrencias
    await queryRunner.createForeignKey(
      'bo_ocorrencias',
      new TableForeignKey({
        name: 'ocorrencia_fk',
        columnNames: ['ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey enderecos
    await queryRunner.createForeignKey(
      'bo_ocorrencias',
      new TableForeignKey({
        name: 'endereco_fk',
        columnNames: ['endereco_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enderecos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey naturezas_ocorrencias
    await queryRunner.createForeignKey(
      'bo_ocorrencias',
      new TableForeignKey({
        name: 'natureza_ocorrencia_fk',
        columnNames: ['natureza_ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'naturezas_ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bo_ocorrencias', 'ocorrencia_fk');
    await queryRunner.dropForeignKey('bo_ocorrencias', 'endereco_fk');
    await queryRunner.dropForeignKey(
      'bo_ocorrencias',
      'natureza_ocorrencia_fk',
    );
    await queryRunner.dropTable('bo_ocorrencias');
  }
}
