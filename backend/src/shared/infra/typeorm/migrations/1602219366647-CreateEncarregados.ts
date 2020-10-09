import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEncarregados1602219366647
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'encarregados',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'gcm_id',
            type: 'uuid',
            comment: 'encarregado da ocorrencia',
          },
          {
            name: 'ocorrencia_id',
            type: 'uuid',
          },
          {
            name: 'natureza_final_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'iluminacao',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'caracteristicas_local',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'tempo',
            type: 'enum',
            enum: ['BOM', 'NEBLINA', 'CHUVA'],
            isNullable: true,
          },
          {
            name: 'hora_local',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'hora_termino',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'relatorio',
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

    //* -> foreignkey gcms
    await queryRunner.createForeignKey(
      'encarregados',
      new TableForeignKey({
        name: 'gcm_fk',
        columnNames: ['gcm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'gcms',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey ocorrencias
    await queryRunner.createForeignKey(
      'encarregados',
      new TableForeignKey({
        name: 'ocorrencia_fk',
        columnNames: ['ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey naturezas_ocorrencias
    await queryRunner.createForeignKey(
      'encarregados',
      new TableForeignKey({
        name: 'natureza_ocorrencia_fk',
        columnNames: ['natureza_final_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'naturezas_ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('encarregados', 'gcm_fk');
    await queryRunner.dropForeignKey('encarregados', 'ocorrencia_fk');
    await queryRunner.dropForeignKey('encarregados', 'natureza_ocorrencia_fk');
    await queryRunner.dropTable('encarregados');
  }
}
