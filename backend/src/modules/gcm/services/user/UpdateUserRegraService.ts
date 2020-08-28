import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import User from '@modules/gcm/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IResquest {
  user_id: string;

  nome_usuario: string;
  email: string;

  regra: string;
}

@injectable()
class UpdateUserRegraService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    nome_usuario,
    email,
    regra,
  }: IResquest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    //* -> check user exists
    if (!user) {
      throw new AppError('Usuário não existe.', 404);
    }
    //* check user permitted
    if (!(user.regra === 'master')) {
      throw new AppError('Usuário não permitido.', 401);
    }

    //! melhorar
    let newUserRole = user;

    if (email && !nome_usuario) {
      const userEmail = await this.usersRepository.findByEmail(email);
      //* check email exists
      if (!userEmail) {
        throw new AppError('E-mail não encontrado.', 404);
      }

      userEmail.regra = regra;

      newUserRole = userEmail;
    }

    if (!email && nome_usuario) {
      const userNomeUsuario = await this.usersRepository.findByNomeUsuario(
        nome_usuario,
      );
      //* -> check nome_usuario exists
      if (!userNomeUsuario) {
        throw new AppError('Nome de usuário não encontrado.', 404);
      }

      userNomeUsuario.regra = regra;

      newUserRole = userNomeUsuario;
    }

    return newUserRole;
  }
}

export default UpdateUserRegraService;
