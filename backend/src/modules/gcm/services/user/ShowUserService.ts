import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import User from '@modules/gcm/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    //* -> check user ecists
    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    return user;
  }
}

export default ShowUserService;
