import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('dados_pessoais')
class DadosPessoais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  rg: string;

  @Column()
  cpf: string;

  @Column()
  telefone: string;

  @Column()
  celular: string;

  @Column()
  nome_mae: string;

  @Column()
  nome_pai: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column()
  local_nascimento: string;

  @Column()
  estado_nascimento: string;

  @Column()
  sexo: string;

  @Column()
  nacionalidade: string;

  @Column()
  naturalidade: string;

  @Column()
  estado_civil: string;

  @Column()
  profissao: string;

  @Column()
  escolaridade: string;

  @Column()
  nome_conjulge: string;

  @Column()
  nome_filhos: string;

  @Column()
  titulo_eleitor: string;

  @Column()
  zona_eleitoral: string;

  @Column()
  cnh: string;

  @Column({ type: 'date' })
  validade_cnh: Date;

  @Column({ type: 'text' })
  observacao: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default DadosPessoais;
