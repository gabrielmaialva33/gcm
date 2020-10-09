import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRetirado1602268495962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'almoxarifado_gcms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'almoxarifado_id',
            type: 'uuid',
          },
          {
            name: 'gcm_id',
            type: 'uuid',
          },
          {
            name: 'quantidade',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'data_retirada',
            type: 'timestamp with time zone',
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

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'almoxarifado_gcms',
      new TableForeignKey({
        name: 'amoxarifado_fk',
        columnNames: ['almoxarifado_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'almoxarifado',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'almoxarifado_gcms',
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
    await queryRunner.dropForeignKey('almoxarifado_gcms', 'amoxarifado_fk');
    await queryRunner.dropForeignKey('almoxarifado_gcms', 'gcm_fk');
    await queryRunner.dropTable('almoxarifado_gcms');
  }
}
