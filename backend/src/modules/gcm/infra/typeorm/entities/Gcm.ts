import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import DadosPessoais from './DadosPessoais';
import Endereco from './Endereco';

export enum Atribuicao {
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

  @Column({
    type: 'enum',
    enum: Atribuicao,
    default: Atribuicao.ADMINISTRATIVO,
  })
  atribuicao: string;

  @Column({ type: 'text' })
  historico: string;
}

export default Gcm;
