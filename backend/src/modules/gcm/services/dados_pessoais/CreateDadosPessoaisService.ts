import { injectable, inject } from 'tsyringe';

import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import AppError from '@shared/errors/AppError';

interface IRequest {
  nome: string;
  rg: string;
  cpf: string;
  telefone: string;
  celular: string;
  nome_mae: string;
  nome_pai: string;
  data_nascimento: Date;
  local_nascimento: string;
  estado_nascimento: string;
  sexo: string;
  nacionalidade: string;
  naturalidade: string;
  estado_civil: string;
  profissao: string;
  escolaridade: string;
  nome_conjulge: string;
  nome_filhos: string;
  titulo_eleitor: string;
  zona_eleitoral: string;
  cnh: string;
  validade_cnh: Date;
}

@injectable()
class CreateDadosPessoaisService {
  constructor(
    @inject('DadosPessoaisRepository')
    private dadosPessoaisRepository: IDadosPessoaisRepository,
  ) {}

  public async execute({
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
  }: IRequest): Promise<DadosPessoais> {
    //* -> checker exists
    const rgExists = await this.dadosPessoaisRepository.findByRg(rg);
    if (rgExists) {
      throw new AppError('RG já cadastrado.', 409);
    }
    const cpfExists = await this.dadosPessoaisRepository.findByCpf(cpf);
    if (cpfExists) {
      throw new AppError('CPF já cadastrado.', 409);
    }
    const tituloEleitorExists = await this.dadosPessoaisRepository.findByTituloEleitor(
      titulo_eleitor,
    );
    if (tituloEleitorExists) {
      throw new AppError('Titulo de Eleitor já cadastrado.', 409);
    }
    const chnExists = await this.dadosPessoaisRepository.findByCnh(cnh);
    if (chnExists) {
      throw new AppError('CNH já cadastrado.', 409);
    }

    //* -> save on db
    const dadosPessoais = await this.dadosPessoaisRepository.create({
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

    return dadosPessoais;
  }
}

export default CreateDadosPessoaisService;
