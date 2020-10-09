import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRodasLocais1602260013202
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rondas_em_locais',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'hora_local',
            type: 'timestamp with time zone',
          },
          {
            name: 'hora_termino',
            type: 'timestamp with time zone',
          },
          {
            name: 'hora_final',
            type: 'timestamp with time zone',
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'ronda_id',
            type: 'uuid',
          },
          {
            name: 'endereco_id',
            type: 'uuid',
            comment: 'local da ronda',
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
      'rondas_em_locais',
      new TableForeignKey({
        name: 'ronda_fk',
        columnNames: ['ronda_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rondas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey enderecos
    await queryRunner.createForeignKey(
      'rondas_em_locais',
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
    await queryRunner.dropForeignKey('rondas_em_locais', 'ronda_fk');
    await queryRunner.dropForeignKey('rondas_em_locais', 'endereco_fk');
    await queryRunner.dropTable('rondas_em_locais');
  }
}
