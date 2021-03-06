import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMunicipios1599023076328
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'municipios',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo_ibge',
            type: 'varchar(7)',
            isNullable: true,
          },
          {
            name: 'municipio',
            type: 'varchar(50)',
          },
          {
            name: 'gentilico',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'estado_id',
            type: 'uuid',
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

    //* -> foreignkey estados
    await queryRunner.createForeignKey(
      'municipios',
      new TableForeignKey({
        name: 'estado_fk',
        columnNames: ['estado_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'estados',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('municipios', 'estado_fk');
    await queryRunner.dropTable('municipios');
  }
}
