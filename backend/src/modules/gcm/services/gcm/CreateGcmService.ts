import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import Gcm from '@modules/gcm/infra/typeorm/entities/Gcm';
import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import IHashProvider from '@modules/gcm/providers/HashProvider/models/IHashProvider';

interface IRequest {
  nome_guerra: string;
  nome_usuario: string;
  email: string;
  senha: string;
}

@injectable()
class CreateCgmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DadosPessoaisRepository')
    private dadosPessoaisRepository: IDadosPessoaisRepository,
  ) {}

  public async execute({
    nome_guerra,
    nome_usuario,
    email,
    senha,
  }: IRequest): Promise<Gcm> {
    //* -> checker exists
    const novoEmail = await this.gcmsRepository.findByEmail(email);
    if (novoEmail) {
      throw new AppError('E-mail já cadastrado.', 409);
    }
    const nomeUsuario = await this.gcmsRepository.findByNomeUsuario(
      nome_usuario,
    );
    if (nomeUsuario) {
      throw new AppError('Nome de usuário já cadastrado.', 409);
    }

    //* -> hash password
    const hashedSenha = await this.hashProvider.generateHash(senha);

    // todo -> implement defaul profile pic

    //* -> save on db
    const gcm = this.gcmsRepository.create({
      nome_guerra,
      nome_usuario,
      email,
      senha: hashedSenha,
    });

    return gcm;
  }
}

export default CreateCgmService;
