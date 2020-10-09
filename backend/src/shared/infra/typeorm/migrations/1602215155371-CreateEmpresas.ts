import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEmpresas1602215155371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'empresas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar(30)',
          },
          {
            name: 'telefone',
            type: 'varchar(20)[]',
            isNullable: true,
          },
          {
            name: 'pessoa_id',
            type: 'uuid',
          },
          {
            name: 'endereco_id',
            type: 'uuid',
          },
          {
            name: 'ponto_referencia',
            type: 'varchar(50)',
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

    //* -> foreignkey pessoas
    await queryRunner.createForeignKey(
      'empresas',
      new TableForeignKey({
        name: 'pessoa_fk',
        columnNames: ['pessoa_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pessoas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey enderecos
    await queryRunner.createForeignKey(
      'empresas',
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
    await queryRunner.dropForeignKey('empresas', 'pessoa_fk');
    await queryRunner.dropForeignKey('empresas', 'endereco_fk');
    await queryRunner.dropTable('empresas');
  }
}
