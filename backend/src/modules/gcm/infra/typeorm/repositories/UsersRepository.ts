import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/gcm/dtos/ICreateUsersDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  //* -> create user on db
  public async create({
    nome_usuario,
    email,
    senha,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ nome_usuario, email, senha });
    await this.ormRepository.save(user);
    return user;
  }

  //* -> update user on db
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  //* -> delete db
  public async detroy(user: User): Promise<User> {
    return this.ormRepository.remove(user);
  }

  //* -> find on db
  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id: user_id } });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findByNomeUsuario(
    nome_usuario: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { nome_usuario } });

    return user;
  }
}

export default UsersRepository;
