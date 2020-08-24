import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
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
class GCM {
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

  @OneToMany(() => Endereco, GcmEnderecos => GcmEnderecos.Enderecos)
  @JoinColumn({ name: 'endereco_id' })
  Enderecos: Endereco;

  @Column({ type: 'enum', enum: RegraEnum, default: RegraEnum.ADMINISTRATIVO })
  regra: string;
}

export default GCM;
