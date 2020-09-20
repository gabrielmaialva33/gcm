import { injectable, inject } from 'tsyringe';

import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import AppError from '@shared/errors/AppError';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
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
class CreateDadosPessoaisService {
  constructor(
    @inject('DadosPessoaisRepository')
    private dadosPessoaisRepository: IDadosPessoaisRepository,

    @inject('MunicipiosRepository')
    private minicipiosRepository: IMunicipiosRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
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
    validade_cnh,
    tipo_cnh,
    observacao,
  }: IRequest): Promise<DadosPessoais> {
    //* -> check exists and user role
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Faça o login no sistema', 404);
    }
    if (!(user.regra === ('master' || 'admin'))) {
      throw new AppError('Usuário não permitido', 401);
    }

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

    //* find and check municipio
    const municipio = await this.minicipiosRepository.findByName(
      municipio_nascimento,
    );
    if (!municipio) {
      throw new AppError('Municipio não encontrado', 404);
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
      municipio_nascimento_id: municipio.id,
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

    return dadosPessoais;
  }
}

export default CreateDadosPessoaisService;
