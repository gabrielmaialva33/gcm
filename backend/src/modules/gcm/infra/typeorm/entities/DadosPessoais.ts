import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';

//* -> enum types
export enum TipoSanguineo {
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
}

@Entity('dados_pessoais')
class DadosPessoais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  nome: string;

  @Column({ type: 'varchar', length: 15 })
  rg: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string[];

  @Column({ type: 'varchar', length: 40 })
  nome_mae: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  nome_pai: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column({ type: 'uuid' })
  municipio_nascimento_id: string;

  @OneToOne(() => Municipio)
  @JoinColumn({ name: 'municipio_nascimento_id' })
  municipio_nascimento: Municipio;

  @Column({ type: 'varchar', length: 10 })
  sexo: string;

  @Column({ type: 'enum', enum: TipoSanguineo, nullable: true })
  tipo_sanguineo: string;

  //! -> warn enum type
  @Column({ type: 'varchar', length: 11, nullable: true })
  estado_civil: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  profissao: string[];

  //! -> warn enum type
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

  //! warn enun type
  @Column({ type: 'varchar', length: 1, nullable: true })
  tipo_cnh: string;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;

  //* -> data to uppercase
  @BeforeInsert()
  @BeforeUpdate()
  toUpperCase() {
    this.nome ? this.nome.toUpperCase() : null;
    this.nome_mae ? this.nome_mae.toUpperCase() : null;
    this.nome_pai ? this.nome_pai.toUpperCase() : null;
    this.sexo ? this.sexo.toUpperCase() : null;
    this.estado_civil ? this.estado_civil.toUpperCase() : null;
    this.profissao
      ? this.profissao.map(i => {
          return i.toUpperCase();
        })
      : null;
    this.escolaridade ? this.escolaridade.toUpperCase() : null;
    this.nome_conjulge ? this.nome_conjulge.toUpperCase() : null;
    this.nome_filhos
      ? this.nome_filhos.map(i => {
          return i.toUpperCase();
        })
      : null;
    this.observacao ? this.observacao.toUpperCase() : null;
  }
}

export default DadosPessoais;
