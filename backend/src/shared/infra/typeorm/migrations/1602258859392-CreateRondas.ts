import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRondas1602258859392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rondas',
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
            name: 'encarregado',
            type: 'uuid',
            comment: 'gcm_id',
          },
          {
            name: 'condutor',
            type: 'uuid',
            comment: 'gcm_id',
          },
          {
            name: 'km_inicio',
            type: 'float(11)',
          },
          {
            name: 'km_final',
            type: 'float(11)',
            isNullable: true,
          },
          {
            name: 'km_total',
            type: 'float(11)',
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

    //* -> foreignkey viaturas
    await queryRunner.createForeignKey(
      'rondas',
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
      'rondas',
      new TableForeignKey({
        name: 'gcm_fk',
        columnNames: ['encarregado'],
        referencedColumnNames: ['id'],
        referencedTableName: 'gcms',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rondas', 'viatura_fk');
    await queryRunner.dropForeignKey('rondas', 'gcm_fk');
    await queryRunner.dropTable('rondas');
  }
}
