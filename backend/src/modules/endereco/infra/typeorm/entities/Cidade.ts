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

  @Column()
  codigo_ibge: string;

  @Column()
  municipio: string;

  @Column()
  gentilico: string;

  @Column()
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
