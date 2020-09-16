import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('estados')
class Estado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 2 })
  codigo_ibge: string;

  @Column({ type: 'varchar', length: 50 })
  uf: string;

  @Column({ type: 'varchar', length: 2 })
  sigla: string;

  @Column({ type: 'varchar', length: 100 })
  gentilico: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Estado;
