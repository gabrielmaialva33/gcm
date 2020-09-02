import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Estados {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigo_ibge: number;

  @Column()
  uf: string;

  @Column()
  sigla: string;

  @Column({ type: 'text' })
  gentiligo: string;
}

export default Estados;
