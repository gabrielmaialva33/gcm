import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Cidade from '@modules/endereco/infra/typeorm/entities/Cidade';

@Entity('dados_pessoais')
class DadosPessoais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  nome: string;

  @Column({ type: 'varchar', length: 15 })
  rg: string;

  @Column({ type: 'varchar', length: 15 })
  cpf: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  celular: string;

  @Column({ type: 'varchar', length: 40 })
  nome_mae: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  nome_pai: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column({ type: 'uuid' })
  municipio_nascimento_id: string;

  @OneToOne(() => Cidade)
  @JoinColumn({ name: 'municipio_nascimento_id' })
  municipio_nascimento: Cidade;

  @Column({ type: 'varchar', length: 10 })
  sexo: string;

  //! warn enum type
  @Column({ type: 'varchar', length: 2 })
  tipo_sanguineo: string;

  //! warn enum type
  @Column({ type: 'varchar', length: 11, nullable: true })
  estado_civil: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  profissao: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  escolaridade: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nome_conjulge: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  nome_filhos: string[];

  @Column({ type: 'varchar', length: 15, nullable: true, unique: true })
  titulo_eleitor: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  zona_eleitoral: string;

  @Column({ type: 'varchar', length: 15, nullable: true, unique: true })
  cnh: string;

  @Column({ type: 'date', nullable: true })
  validade_cnh: Date;

  @Column({ type: 'varchar', length: 1 })
  tipo_cnh: string;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default DadosPessoais;
