import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCondutores1602267096153
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'viaturas_gcms',
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
            name: 'gcm_id',
            type: 'uuid',
          },
          {
            name: 'km_inicial',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'km_final',
            type: 'uuid',
            isNullable: true,
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

    //* -> foreignkey viaturas
    await queryRunner.createForeignKey(
      'viaturas_gcms',
      new TableForeignKey({
        name: 'viatura_fk',
        columnNames: ['viatura_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'viaturas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'viaturas_gcms',
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
    await queryRunner.dropForeignKey('viaturas_gcms', 'viatura_fk');
    await queryRunner.dropForeignKey('viaturas_gcms', 'gcm_fk');
    await queryRunner.dropTable('viaturas_gcms');
  }
}
