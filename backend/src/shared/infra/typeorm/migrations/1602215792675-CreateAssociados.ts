import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAssociados1602215792675
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoas_contatos',
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
            name: 'contato_id',
            type: 'uuid',
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

    //* -> foreignkey pessoas
    await queryRunner.createForeignKey(
      'pessoas_contatos',
      new TableForeignKey({
        name: 'pessoa_fk',
        columnNames: ['pessoa_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pessoas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    //* -> foreignkey contatos
    await queryRunner.createForeignKey(
      'pessoas_contatos',
      new TableForeignKey({
        name: 'contato_fk',
        columnNames: ['contato_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contatos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pessoas_contatos', 'pessoa_fk');
    await queryRunner.dropForeignKey('pessoas_contatos', 'contato_fk');
    await queryRunner.dropTable('pessoas_contatos');
  }
}
