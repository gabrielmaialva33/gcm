import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import DadosPessoais from './DadosPessoais';
import Endereco from './Endereco';

export enum RegraEnum {
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
  nome_usuario: string;

  @Column()
  email: string;

  @Column()
  senha: string;

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

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: RegraEnum, default: RegraEnum.ADMINISTRATIVO })
  regra: string;
}

export default Gcm;
