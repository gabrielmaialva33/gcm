import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateVeiculosOcorrencias1602264641892
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'veiculos_em_bo',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'bo_ocorrencia_id',
            type: 'uuid',
          },
          {
            name: 'veiculo_id',
            type: 'uuid',
          },
          {
            name: 'pontos_impacto',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'danos',
            type: 'enum',
            enum: ['PEQUENA-MONTA', 'MEDIA-MONTA', 'GRANDE-MONTA'],
            isNullable: true,
          },
          {
            name: 'impacto_total',
            type: 'int[]',
            isNullable: true,
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

    //* -> foreignkey bo_ocorrencias
    await queryRunner.createForeignKey(
      'veiculos_em_bo',
      new TableForeignKey({
        name: 'bo_ocorrencia_fk',
        columnNames: ['bo_ocorrencia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bo_ocorrencias',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey veiculos
    await queryRunner.createForeignKey(
      'veiculos_em_bo',
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
    await queryRunner.dropForeignKey('veiculos_em_bo', 'bo_ocorrencia_fk');
    await queryRunner.dropForeignKey('veiculos_em_bo', 'veiculo_fk');
    await queryRunner.dropTable('veiculos_em_bo');
  }
}
