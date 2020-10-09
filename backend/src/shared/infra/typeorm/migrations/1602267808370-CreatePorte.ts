import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePorte1602267808370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'armas_gcms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'arma_id',
            type: 'uuid',
          },
          {
            name: 'gcm_id',
            type: 'uuid',
          },
          {
            name: 'data_retiro',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'data_entrega',
            type: 'timestamp with time zone',
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

    //* -> foreignkey armas
    await queryRunner.createForeignKey(
      'armas_gcms',
      new TableForeignKey({
        name: 'arma_fk',
        columnNames: ['arma_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'armas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'armas_gcms',
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
    await queryRunner.dropForeignKey('viaturas_gcms', 'arma_fk');
    await queryRunner.dropForeignKey('viaturas_gcms', 'gcm_fk');
    await queryRunner.dropTable('armas_gcms');
  }
}
