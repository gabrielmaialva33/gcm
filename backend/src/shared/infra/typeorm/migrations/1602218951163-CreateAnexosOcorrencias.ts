import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAnexosOcorrencias1602218951163
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'anexos_ocorrencias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'ocorrencia_id',
            type: 'uuid',
          },
          {
            name: 'anexo_id',
            type: 'uuid',
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
      'anexos_ocorrencias',
      new TableForeignKey({
        name: 'ocorrencia_fk',
        columnNames: ['ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey anexos
    await queryRunner.createForeignKey(
      'anexos_ocorrencias',
      new TableForeignKey({
        name: 'anexo_fk',
        columnNames: ['anexo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'anexos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('anexos_ocorrencias', 'ocorrencia_fk');
    await queryRunner.dropForeignKey('anexos_ocorrencias', 'anexo_fk');
    await queryRunner.dropTable('anexos_ocorrencias');
  }
}
