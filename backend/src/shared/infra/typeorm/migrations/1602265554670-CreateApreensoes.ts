import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateApreensoes1602265554670
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'objetos_em_bo',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'objeto_id',
            type: 'uuid',
          },
          {
            name: 'bo_ocorrencia_id',
            type: 'uuid',
          },
          {
            name: 'observacao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'destino',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'recebedor',
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

    //* -> foreignkey objetos
    await queryRunner.createForeignKey(
      'objetos_em_bo',
      new TableForeignKey({
        name: 'objeto_fk',
        columnNames: ['objeto_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'objetos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey bo_ocorrencias
    await queryRunner.createForeignKey(
      'objetos_em_bo',
      new TableForeignKey({
        name: 'bo_ocorrencia_fk',
        columnNames: ['bo_ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bo_ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('objetos_em_bo', 'objeto_fk');
    await queryRunner.dropForeignKey('objetos_em_bo', 'bo_ocorrencia_fk');
    await queryRunner.dropTable('objetos_em_bo');
  }
}
