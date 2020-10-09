import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEnvolvidos1602264056449
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoas_em_bo',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pessoa_id',
            type: 'uuid',
          },
          {
            name: 'bo_ocorrencia_id',
            type: 'uuid',
          },
          {
            name: 'condicao_id',
            type: 'uuid',
          },
          {
            name: 'categoria',
            type: 'enum',
            enum: ['CRIANCA', 'ADOLESCENTE', 'ADULTO', 'IDOSO'],
            default: "'ADULTO'",
          },
          {
            name: 'versao',
            type: 'text',
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
      'pessoas_em_bo',
      new TableForeignKey({
        name: 'pessoa_fk',
        columnNames: ['pessoa_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pessoas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey bo_ocorrencias
    await queryRunner.createForeignKey(
      'pessoas_em_bo',
      new TableForeignKey({
        name: 'bo_ocorrencia_fk',
        columnNames: ['bo_ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bo_ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey condicoes
    await queryRunner.createForeignKey(
      'pessoas_em_bo',
      new TableForeignKey({
        name: 'condicao_fk',
        columnNames: ['condicao_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'condicoes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pessoas_em_bo', 'pessoa_fk');
    await queryRunner.dropForeignKey('pessoas_em_bo', 'bo_ocorrencia_fk');
    await queryRunner.dropForeignKey('pessoas_em_bo', 'condicao_fk');
    await queryRunner.dropTable('pessoas_em_bo');
  }
}
