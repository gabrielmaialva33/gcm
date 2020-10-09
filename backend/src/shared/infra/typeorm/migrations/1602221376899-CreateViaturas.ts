import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateViaturas1602221376899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'viaturas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'veiculo_id',
            type: 'uuid',
          },
          {
            name: 'uso',
            type: 'boolean',
            default: false,
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

    //* -> foreignkey veiculos
    await queryRunner.createForeignKey(
      'viaturas',
      new TableForeignKey({
        name: 'veiculo_fk',
        columnNames: ['veiculo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'veiculos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('viaturas', 'veiculo_fk');
    await queryRunner.dropTable('viaturas');
  }
}
