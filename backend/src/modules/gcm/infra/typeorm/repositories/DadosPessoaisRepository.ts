import { getRepository, Repository } from 'typeorm';

import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import ICreateDadosPessoaisDTO from '@modules/gcm/dtos/ICreateDadosPessoaisDTO';

class DadosPessoaisRepository implements IDadosPessoaisRepository {
  private ormRepository: Repository<DadosPessoais>;

  constructor() {
    this.ormRepository = getRepository(DadosPessoais);
  }

  //* ->  create on db
  public async create({
    nome,
    rg,
    cpf,
    telefone,
    celular,
    nome_mae,
    nome_pai,
    data_nascimento,
    local_nascimento,
    estado_nascimento,
    sexo,
    nacionalidade,
    naturalidade,
    estado_civil,
    profissao,
    escolaridade,
    nome_conjulge,
    nome_filhos,
    titulo_eleitor,
    zona_eleitoral,
    cnh,
    validade_cnh,
  }: ICreateDadosPessoaisDTO): Promise<DadosPessoais> {
    const dadosPessoais = this.ormRepository.create({
      nome,
      rg,
      cpf,
      telefone,
      celular,
      nome_mae,
      nome_pai,
      data_nascimento,
      local_nascimento,
      estado_nascimento,
      sexo,
      nacionalidade,
      naturalidade,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjulge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      validade_cnh,
    });

    await this.ormRepository.save(dadosPessoais);

    return dadosPessoais;
  }

  //* -> save on db
  public async save(dadosPessoais: DadosPessoais): Promise<DadosPessoais> {
    return this.ormRepository.save(dadosPessoais);
  }

  //* -> find on db
  public async findById(id: string): Promise<DadosPessoais | undefined> {
    const dadosPessoais = await this.ormRepository.findOne({ where: { id } });

    return dadosPessoais;
  }
}

export default DadosPessoaisRepository;
