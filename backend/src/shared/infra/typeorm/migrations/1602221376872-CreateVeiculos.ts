import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateVeiculos1602221376872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'veiculos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'registro',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'renavam',
            type: 'varchar(15)',
          },
          {
            name: 'placa',
            type: 'varchar(10)',
          },
          {
            name: 'municipio_id',
            type: 'uuid',
          },
          {
            name: 'chassi',
            type: 'varchar(20)',
          },
          {
            name: 'marca',
            type: 'varchar(10)',
          },
          {
            name: 'modelo',
            type: 'varchar(10)',
          },
          {
            name: 'tipo_especie',
            type: 'varchar(10)',
          },
          {
            name: 'cor',
            type: 'varchar(10)',
          },
          {
            name: 'categoria',
            type: 'varchar(15)',
          },
          {
            name: 'ano',
            type: 'date',
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

    //* -> foreignkey municipios
    await queryRunner.createForeignKey(
      'veiculos',
      new TableForeignKey({
        name: 'municipio_fk',
        columnNames: ['municipio_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'municipios',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('veiculos', 'municipio_fk');
    await queryRunner.dropTable('veiculos');
  }
}
