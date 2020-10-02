import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Gcm from './Gcm';

@Entity('keycodes')
class Keycode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 8, unique: true })
  keycode: string;

  @Column({ type: 'uuid', unique: true })
  gcm_id: string;

  @OneToOne(() => Gcm)
  @JoinColumn({ name: 'gcm_id' })
  gcm: Gcm;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;

  //* -> data to uppercase
  @BeforeInsert()
  @BeforeUpdate()
  toUpperCase() {
    this.keycode = this.keycode.toUpperCase();
  }
}

export default Keycode;
