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

import Bairro from '@modules/endereco/infra/typeorm/entities/Bairro';

@Entity('enderecos')
class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  logradouro: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  numero: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  complemento: string;

  @Column({ type: 'varchar', length: 15 })
  cep: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
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

  //* -> data to uppercase
  @BeforeInsert()
  @BeforeUpdate()
  toUpperCase() {
    this.logradouro = this.logradouro.toUpperCase();
    this.complemento = this.complemento.toUpperCase();
  }
}

export default Endereco;
