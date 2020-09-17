import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Municipio from './Municipio';

@Entity('bairros')
class Bairro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 6 })
  codigo_bairro: string;

  @Column({ type: 'text' })
  observacao: string;

  @Column({ type: 'uuid' })
  municipio_id: string;

  @OneToOne(() => Municipio)
  @JoinColumn({ name: 'municipio_id' })
  municipio: Municipio;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Bairro;
