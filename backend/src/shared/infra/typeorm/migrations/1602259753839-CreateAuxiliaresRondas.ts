import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAuxiliaresRondas1602259753839
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auxiliares_em_rondas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'roda_id',
            type: 'uuid',
          },
          {
            name: 'gcm_id',
            type: 'uuid',
            comment: 'auxililar roda',
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

    //* -> foreignkey rodas
    await queryRunner.createForeignKey(
      'auxiliares_em_rondas',
      new TableForeignKey({
        name: 'roda_fk',
        columnNames: ['roda_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rondas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'auxiliares_em_rondas',
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
    await queryRunner.dropForeignKey('auxiliares_em_rondas', 'ronda_fk');
    await queryRunner.dropForeignKey('auxiliares_em_rondas', 'gcm_fk');
    await queryRunner.dropTable('auxiliares_em_rondas');
  }
}
