import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import DadosPessoais from './DadosPessoais';
import Endereco from './Endereco';

export enum Cargo {
  'COMANDANTE',
  'SUB_COMANDANTE',
  'ADMINISTRATIVO',
  'COI',
  'SUPERVISOR',
  'OFICIAL',
}

@Entity()
class Gcm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ generated: 'increment' })
  matricula_gcm: number;

  @Column()
  nome_guerra: string;

  @Column()
  dados_pessoais_id: string;

  @OneToOne(() => DadosPessoais)
  @JoinColumn({ name: 'dados_pessoais_id' })
  DadosPessoais: DadosPessoais;

  @Column()
  endereco_id: string;

  @OneToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  Enderecos: Endereco;

  @Column({ type: 'enum', enum: Cargo, default: Cargo.ADMINISTRATIVO })
  regra: string;
}

export default Gcm;
