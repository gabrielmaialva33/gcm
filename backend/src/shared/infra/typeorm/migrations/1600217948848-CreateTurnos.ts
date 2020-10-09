import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTurnos1602214094176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'escalas_gcms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'gcm_id',
            type: 'uuid',
          },
          {
            name: 'escala_id',
            type: 'uuid',
          },
          {
            name: 'data_inicio',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'data_fim',
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
      'escalas_gcms',
      new TableForeignKey({
        name: 'gcm_fk',
        columnNames: ['gcm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'gcms',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey escalas
    await queryRunner.createForeignKey(
      'escalas_gcms',
      new TableForeignKey({
        name: 'escala_fk',
        columnNames: ['escala_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'escalas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('escalas_gcms', 'gcm_fk');
    await queryRunner.dropForeignKey('escalas_gcms', 'escala_fk');
    await queryRunner.dropTable('escalas_gcms');
  }
}
