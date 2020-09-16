import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Bairro from './Bairro';

Entity('enderecos');
class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  logradouro: string;

  @Column({ type: 'varchar', length: 4 })
  numero: string;

  @Column({ type: 'varchar', length: 100 })
  complemento: string;

  @Column({ type: 'varchar', length: 15 })
  cep: string;

  @Column({ type: 'varchar', length: 6 })
  codigo_endereco: string;

  @Column({ type: 'uuid' })
  bairro_id: string;

  @OneToOne(() => Bairro)
  @JoinColumn({ name: 'bairro_id' })
  bairro: Bairro;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Endereco;
