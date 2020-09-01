import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Gcm from './Gcm';

enum Regra {
  'admin',
  'master',
  'membro',
}

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_usuario: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'enum', enum: Regra, default: Regra.admin })
  regra: string;

  @Column()
  avatar: string;

  @Column({ type: 'uuid' })
  gcm_id: string;

  @OneToOne(() => Gcm)
  @JoinColumn({ name: 'gcm_id' })
  Gcm: Gcm;
}

export default User;
