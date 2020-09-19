import { injectable, inject } from 'tsyringe';

import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  dados_pessoais_id: string;
  //* data entity
  nome: string;
  rg: string;
  cpf: string;
  telefone: string[];
  celular: string[];
  nome_mae: string;
  nome_pai: string;
  data_nascimento: Date;
  municipio_nascimento: string;
  sexo: string;
  tipo_sanguineo: string;
  estado_civil: string;
  profissao: string[];
  escolaridade: string;
  nome_conjulge: string;
  nome_filhos: string[];
  titulo_eleitor: string;
  zona_eleitoral: string;
  cnh: string;
  validade_cnh: Date;
  tipo_cnh: string;
  observacao: string;
}

@injectable()
class UpdateDadosPessoaisService {
  constructor(
    @inject('DadosPessoaisRepository')
    private dadosPessoais: IDadosPessoaisRepository,

    @inject('MunicipiosRepository')
    private minicipiosRepository: IMunicipiosRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    dados_pessoais_id,
    nome,
    rg,
    cpf,
    telefone,
    celular,
    nome_mae,
    nome_pai,
    data_nascimento,
    municipio_nascimento,
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
    tipo_cnh,
    validade_cnh,
    observacao,
  }: IRequest): Promise<DadosPessoais> {
    // todo create checks
    //* -> find and check user_id exists and role
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    if (!(user.regra === ('master' || 'admin'))) {
      throw new AppError('Usuário não permitido', 401);
    }

    //* ->find and check dados_pessoais exists
    const dados_pessoais = await this.dadosPessoais.findById(dados_pessoais_id);
    if (!dados_pessoais) {
      throw new AppError('Dados Pessoais não encontrado', 404);
    }

    //* find and check municipio exists
    const municipio = await this.minicipiosRepository.findByName(
      municipio_nascimento,
    );
    if (!municipio) {
      throw new AppError('Municipio não encontrado', 404);
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
    dados_pessoais.municipio_nascimento_id = municipio.id;
    dados_pessoais.sexo = sexo;
    dados_pessoais.tipo_sanguineo = tipo_sanguineo;
    dados_pessoais.estado_civil = estado_civil;
    dados_pessoais.profissao = profissao;
    dados_pessoais.escolaridade = escolaridade;
    dados_pessoais.nome_conjulge = nome_conjulge;
    dados_pessoais.nome_filhos = nome_filhos;
    dados_pessoais.titulo_eleitor = titulo_eleitor;
    dados_pessoais.zona_eleitoral = zona_eleitoral;
    dados_pessoais.cnh = cnh;
    dados_pessoais.validade_cnh = validade_cnh;
    dados_pessoais.tipo_cnh = tipo_cnh;
    dados_pessoais.observacao = observacao;

    await this.dadosPessoais.save(dados_pessoais);

    return dados_pessoais;
  }
}

export default UpdateDadosPessoaisService;
