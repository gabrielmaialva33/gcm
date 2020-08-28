import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import User from '@modules/gcm/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

@injectable()
class DestroyUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    //* -> check user exist
    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    //* -> checks user permitions
    if (!(user.regra === 'master')) {
      throw new AppError('Usuário não permitido', 401);
    }

    await this.usersRepository.detroy(user);
    return user;
  }
}

export default DestroyUserService;
