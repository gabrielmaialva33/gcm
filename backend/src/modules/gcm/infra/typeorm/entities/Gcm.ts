import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import Endereco from '@modules/endereco/infra/typeorm/entities/Endereco';
import DadosPessoais from './DadosPessoais';

export enum Atribuicao {
  'COMANDANTE',
  'SUB_COMANDANTE',
  'ADMINISTRATIVO',
  'COI',
  'SUPERVISOR',
  'OFICIAL',
}

@Entity('gcms')
class Gcm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', generated: 'increment' })
  matricula_gcm: number;

  @Column({ type: 'varchar', length: 20 })
  nome_guerra: string;

  @Column({ type: 'uuid' })
  dados_pessoais_id: string;

  @OneToOne(() => DadosPessoais)
  @JoinColumn({ name: 'dados_pessoais_id' })
  dados_pessoais: DadosPessoais;

  @Column({ type: 'uuid' })
  endereco_id: string;

  @OneToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  @Column({
    type: 'enum',
    enum: Atribuicao,
    default: Atribuicao.OFICIAL,
  })
  atribuicao: string;

  @Column({ type: 'varchar', nullable: true })
  historico: string[];

  //! warn enum type
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Gcm;
