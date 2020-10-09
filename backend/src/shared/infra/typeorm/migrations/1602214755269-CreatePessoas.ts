import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePessoas1602214755269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'dados_pessoais_id',
            type: 'uuid',
          },
          {
            name: 'endereco_id',
            type: 'uuid',
          },
          {
            name: 'observacao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: ' timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: ' timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    //* -> foreignkey dados_pessoais
    await queryRunner.createForeignKey(
      'pessoas',
      new TableForeignKey({
        name: 'dados_pessoais_fk',
        columnNames: ['dados_pessoais_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dados_pessoais',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey enderecos
    await queryRunner.createForeignKey(
      'pessoas',
      new TableForeignKey({
        name: 'endereco_fk',
        columnNames: ['endereco_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enderecos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pessoas', 'dados_pessoais_fk');
    await queryRunner.dropForeignKey('pessoas', 'endereco_fk');
    await queryRunner.dropTable('escalas_gcms');
  }
}
