import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateGcmsEmOcorrencias1602220632127
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gcms_em_ocorrencias',
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
            name: 'gcm_id',
            type: 'uuid',
          },
          {
            name: 'observacao',
            type: 'varchar(50)',
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
      'gcms_em_ocorrencias',
      new TableForeignKey({
        name: 'ocorrencia_fk',
        columnNames: ['ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'gcms_em_ocorrencias',
      new TableForeignKey({
        name: 'gcm_fk',
        columnNames: ['gcm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'gcms',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('gcms_em_ocorrencias', 'gcm_fk');
    await queryRunner.dropForeignKey('gcms_em_ocorrencias', 'ocorrencia_fk');
    await queryRunner.dropTable('gcms_em_ocorrencias');
  }
}
