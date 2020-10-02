import { injectable, inject } from 'tsyringe';
import crypto from 'crypto';

import IKeycodesRepository from '@modules/gcm/repositories/IKeycodesRepository';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import Keycode from '@modules/gcm/infra/typeorm/entities/Keycode';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  gcm_id: string;
}

@injectable()
class CreateKeycodeService {
  constructor(
    @inject('KeycodesRepository')
    private keycodesRepository: IKeycodesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,
  ) {}

  public async execute({ user_id, gcm_id }: IRequest): Promise<Keycode> {
    //* -> check exists and user role
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Faça o login no sistema', 404);
    }
    if (!(user.regra === ('master' || 'admin'))) {
      throw new AppError('Usuário não permitido', 401);
    }

    //* -> check gcm_id exists
    const gcm = await this.gcmsRepository.findById(gcm_id);
    if (!gcm) {
      throw new AppError('Gcm não encontrado', 404);
    }

    //* -> gen keycode
    let keycode = crypto.randomBytes(8).toString('hex');

    console.log(keycode);

    //* -> check keycode exists
    const keycodeExists = await this.keycodesRepository.findByKeycode(keycode);
    if (keycodeExists) {
      keycode = crypto.randomBytes(8).toString('hex');
    }

    //* -> store on db
    const new_keycode = await this.keycodesRepository.create({
      keycode,
      gcm_id,
    });

    return new_keycode;
  }
}

export default CreateKeycodeService;
