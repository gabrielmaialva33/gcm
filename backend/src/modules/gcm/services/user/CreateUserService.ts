import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';

import User from '@modules/gcm/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/gcm/providers/HashProvider/models/IHashProvider';

interface IRequest {
  nome_usuario: string;
  email: string;
  senha: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    nome_usuario,
    email,
    senha,
  }: IRequest): Promise<User> {
    //* -> checker exists
    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('E-mail já cadastrado.', 409);
    }
    const usuarioExists = await this.usersRepository.findByNomeUsuario(
      nome_usuario,
    );
    if (usuarioExists) {
      throw new AppError('Nome de usuário já cadastrado.', 409);
    }

    //* -> hash password
    const hashedSenha = await this.hashProvider.generateHash(senha);

    // todo -> implement default profile pic

    //* -> save on db
    const user = this.usersRepository.create({
      nome_usuario,
      email,
      senha: hashedSenha,
    });

    return user;
  }
}

export default CreateUserService;
