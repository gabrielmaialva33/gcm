import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import Municipio from './Municipio';

@Entity('bairros')
class Bairro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  codigo_bairro: string;

  @Column({ type: 'text', nullable: true })
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

  //* -> data to uppercase
  @BeforeInsert()
  @BeforeUpdate()
  toUpperCase() {
    this.nome = this.nome.toUpperCase();
    this.observacao = this.observacao.toUpperCase();
  }
}

export default Bairro;
