import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import User from '@modules/gcm/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/gcm/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  nome_usuario: string;
  email: string;
  senha?: string;
  velha_senha?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    nome_usuario,
    email,
    senha,
    velha_senha,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    //* ->  check user exists
    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    //* -> check user owner
    if (user.id !== user_id) {
      throw new AppError('Usuário não permitido', 401);
    }

    //* -> check email exists
    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('O e-mail já está em uso.', 409);
    }

    //* -> update
    user.nome_usuario = nome_usuario;
    user.email = email;

    //* -> update user password
    if (senha && !velha_senha) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha.',
        406,
      );
    }

    if (senha && velha_senha) {
      const checkOldPassword = await this.hashProvider.compareHash(
        velha_senha,
        user.senha,
      );

      if (!checkOldPassword) {
        throw new AppError('A velha senha não confere.', 401);
      }

      user.senha = await this.hashProvider.generateHash(senha);
    }
    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
