import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  detroy(user: User): Promise<User>;
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByNomeUsuario(nome_usuario: string): Promise<User | undefined>;
}
