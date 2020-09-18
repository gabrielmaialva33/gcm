import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
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

  @Column({ type: 'varchar', length: 15, unique: true })
  nome_usuario: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  senha: string;

  @Column({ type: 'enum', enum: Regra, default: Regra.admin })
  regra: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'uuid' })
  gcm_id: string;

  @OneToOne(() => Gcm)
  @JoinColumn({ name: 'gcm_id' })
  gcm: Gcm;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default User;
