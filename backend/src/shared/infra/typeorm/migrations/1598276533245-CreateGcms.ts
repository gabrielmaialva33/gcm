import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateGcms1598276533245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gcms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'matricula_gcm',
            type: 'int',
            generationStrategy: 'increment',
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
            name: 'nome_guerra',
            type: 'varchar(15)',
          },
          {
            name: 'atribuicao',
            type: 'enum',
            default: "'administrativo'",
            enum: [
              'comandante',
              'sub_comandante',
              'administrativo',
              'coi',
              'supervisor',
              'oficial',
            ],
          },
          {
            name: 'historico',
            type: 'varchar(200)[]',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar(20)',
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
      'gcms',
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
      'gcms',
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
    await queryRunner.dropForeignKey('gcms', 'dados_pessoais_fk');
    await queryRunner.dropForeignKey('gcms', 'endereco_fk');
    await queryRunner.dropTable('gcms');
  }
}
