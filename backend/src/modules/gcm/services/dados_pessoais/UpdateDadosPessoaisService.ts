import { injectable, inject } from 'tsyringe';

import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import AppError from '@shared/errors/AppError';

interface IRequest {
  dados_pessoais_id: string;
  //* data entity
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
  observacao: string;
}

@injectable()
class UpdateDadosPessoaisService {
  constructor(
    @inject('DadosPessoaisRepository')
    private dadosPessoais: IDadosPessoaisRepository,
  ) {}

  public async execute({
    dados_pessoais_id,
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
    // todo create checks

    const dados_pessoais = await this.dadosPessoais.findById(dados_pessoais_id);

    if (!dados_pessoais) {
      throw new AppError('Endereço não encontrado', 404);
    }
    //* -> data update
    dados_pessoais.nome = nome;
    dados_pessoais.rg = rg;
    dados_pessoais.cpf = cpf;
    dados_pessoais.telefone = telefone;
    dados_pessoais.celular = celular;
    dados_pessoais.nome_mae = nome_mae;
    dados_pessoais.nome_pai = nome_pai;
    dados_pessoais.data_nascimento = data_nascimento;
    dados_pessoais.local_nascimento = local_nascimento;
    dados_pessoais.estado_nascimento = estado_nascimento;
    dados_pessoais.sexo = sexo;
    dados_pessoais.nacionalidade = nacionalidade;
    dados_pessoais.naturalidade = naturalidade;
    dados_pessoais.estado_civil = estado_civil;
    dados_pessoais.profissao = profissao;
    dados_pessoais.escolaridade = escolaridade;
    dados_pessoais.nome_conjulge = nome_conjulge;
    dados_pessoais.nome_filhos = nome_filhos;
    dados_pessoais.titulo_eleitor = titulo_eleitor;
    dados_pessoais.zona_eleitoral = zona_eleitoral;
    dados_pessoais.cnh = cnh;
    dados_pessoais.validade_cnh = validade_cnh;

    await this.dadosPessoais.save(dados_pessoais);

    return dados_pessoais;
  }
}

export default UpdateDadosPessoaisService;
