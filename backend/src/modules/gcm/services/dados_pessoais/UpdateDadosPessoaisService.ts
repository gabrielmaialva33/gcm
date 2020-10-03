import { injectable, inject } from 'tsyringe';
import validator from 'validator';

import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import AppError from '@shared/errors/AppError';
import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';

interface IRequest {
  user_id: string;
  gcm_id: string;
  //* data entity
  nome?: string;
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
    private dadosPessoaisRepository: IDadosPessoaisRepository,

    @inject('MunicipiosRepository')
    private minicipiosRepository: IMunicipiosRepository,

    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    gcm_id,
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
    //* -> find and check user_id exists and role
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    if (!(user.regra === ('master' || 'admin'))) {
      throw new AppError('Usuário não permitido', 401);
    }

    //* ->  validing uuid string
    if (!validator.isUUID(gcm_id)) {
      throw new AppError('Parametro invalido', 400);
    }
    //* -> find and check gcm exists
    const gcm = await this.gcmsRepository.findById(gcm_id);
    if (!gcm) {
      throw new AppError('Gcm não encontrado', 404);
    }

    //* ->find and check dados_pessoais exists
    const dados_pessoais = await this.dadosPessoaisRepository.findById(
      gcm.dados_pessoais_id,
    );
    if (!dados_pessoais) {
      throw new AppError('Dados Pessoais não encontrado', 404);
    }

    //! find and check municipio exists

    const municipio = await this.minicipiosRepository.findByName(
      municipio_nascimento ? municipio_nascimento.toUpperCase() : '',
    );
    if (!municipio && municipio_nascimento) {
      throw new AppError('Municipio não encontrado', 404);
    }

    //* -> check data exists
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

    //* -> data update
    nome ? (dados_pessoais.nome = nome) : null;
    rg ? (dados_pessoais.rg = rg) : null;
    cpf ? (dados_pessoais.cpf = cpf) : null;
    telefone ? (dados_pessoais.telefone = telefone) : null;
    celular ? (dados_pessoais.celular = celular) : null;
    nome_mae ? (dados_pessoais.nome_mae = nome_mae) : null;
    nome_pai ? (dados_pessoais.nome_pai = nome_pai) : null;
    data_nascimento ? (dados_pessoais.data_nascimento = data_nascimento) : null;

    //* -> municipio_nascimento
    municipio_nascimento
      ? (dados_pessoais.municipio_nascimento_id = municipio
          ? municipio.id
          : dados_pessoais.municipio_nascimento_id)
      : null;

    sexo ? (dados_pessoais.sexo = sexo) : null;
    tipo_sanguineo ? (dados_pessoais.tipo_sanguineo = tipo_sanguineo) : null;
    estado_civil ? (dados_pessoais.estado_civil = estado_civil) : null;
    profissao ? (dados_pessoais.profissao = profissao) : null;
    escolaridade ? (dados_pessoais.escolaridade = escolaridade) : null;
    nome_conjulge ? (dados_pessoais.nome_conjulge = nome_conjulge) : null;
    nome_filhos ? (dados_pessoais.nome_filhos = nome_filhos) : null;
    titulo_eleitor ? (dados_pessoais.titulo_eleitor = titulo_eleitor) : null;
    zona_eleitoral ? (dados_pessoais.zona_eleitoral = zona_eleitoral) : null;
    cnh ? (dados_pessoais.cnh = cnh) : null;
    validade_cnh ? (dados_pessoais.validade_cnh = validade_cnh) : null;
    tipo_cnh ? (dados_pessoais.tipo_cnh = tipo_cnh) : null;
    dados_pessoais ? (dados_pessoais.observacao = observacao) : null;

    return this.dadosPessoaisRepository.save(dados_pessoais);
  }
}

export default UpdateDadosPessoaisService;
