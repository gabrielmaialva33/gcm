import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import Estado from '@modules/endereco/infra/typeorm/entities/Estado';

@Entity('cidades')
class Cidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 7 })
  codigo_ibge: string;

  @Column({ type: 'varchar', length: 50 })
  municipio: string;

  @Column({ type: 'varchar', length: 100 })
  gentilico: string;

  @Column({ type: 'uuid' })
  estado_id: string;

  @OneToOne(() => Estado)
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Cidade;
