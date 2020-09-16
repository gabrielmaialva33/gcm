import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBairros1599248227641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bairros',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo_bairro',
            type: 'varchar(6)',
            isNullable: true,
          },
          {
            name: 'nome',
            type: 'varchar(100)',
          },
          {
            name: 'observacao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'municipio_id',
            type: 'uuid',
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

    //* -> foreignkey estados
    await queryRunner.createForeignKey(
      'bairros',
      new TableForeignKey({
        name: 'municipio_fk',
        columnNames: ['municipio_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cidades',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bairros', 'municipio_fk');
    await queryRunner.dropTable('bairros');
  }
}
