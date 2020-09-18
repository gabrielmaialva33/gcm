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
    municipio_nascimento_id,
    sexo,
    tipo_sanguineo,
    estado_civil,
    profissao,
    escolaridade,
    nome_conjulge,
    nome_filhos,
    titulo_eleitor,
    zona_eleitoral,
    cnh,
    validade_cnh,
    tipo_cnh,
    observacao,
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
      municipio_nascimento_id,
      sexo,
      tipo_sanguineo,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjulge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      validade_cnh,
      tipo_cnh,
      observacao,
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

  public async findByRg(rg: string): Promise<DadosPessoais | undefined> {
    const dadosPessoais = await this.ormRepository.findOne({ where: { rg } });

    return dadosPessoais;
  }

  public async findByCpf(cpf: string): Promise<DadosPessoais | undefined> {
    const dadosPessoais = await this.ormRepository.findOne({ where: { cpf } });

    return dadosPessoais;
  }

  public async findByTituloEleitor(
    titulo_eleitor: string,
  ): Promise<DadosPessoais | undefined> {
    const dadosPessoais = await this.ormRepository.findOne({
      where: { titulo_eleitor },
    });

    return dadosPessoais;
  }

  public async findByCnh(cnh: string): Promise<DadosPessoais | undefined> {
    const dadosPessoais = await this.ormRepository.findOne({ where: { cnh } });

    return dadosPessoais;
  }
}

export default DadosPessoaisRepository;
