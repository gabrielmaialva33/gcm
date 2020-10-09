import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateViaturasEmOcorrencias1602221376974
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'viaturas_em_ocorrencias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'viatura_id',
            type: 'uuid',
          },
          {
            name: 'ocorrencia_id',
            type: 'uuid',
          },
          {
            name: 'km_inicial',
            type: 'float(11)',
          },
          {
            name: 'km_final',
            type: 'float(11)',
            isNullable: true,
          },
          {
            name: 'km_rodado',
            type: 'float(11)',
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

    //* -> foreignkey viaturas
    await queryRunner.createForeignKey(
      'viaturas_em_ocorrencias',
      new TableForeignKey({
        name: 'viatura_fk',
        columnNames: ['viatura_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'viaturas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey ocorrencias
    await queryRunner.createForeignKey(
      'viaturas_em_ocorrencias',
      new TableForeignKey({
        name: 'ocorrencia_fk',
        columnNames: ['ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('viaturas_em_ocorrencias', 'viatura_fk');
    await queryRunner.dropForeignKey(
      'viaturas_em_ocorrencias',
      'ocorrencia_fk',
    );
    await queryRunner.dropTable('viaturas_em_ocorrencias');
  }
}
