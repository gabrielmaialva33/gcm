import { getRepository, Repository } from 'typeorm';

import IKeycodesRepository from '@modules/gcm/repositories/IKeycodesRepository';
import ICreateKeycodesDTO from '@modules/gcm/dtos/ICreateKeycodesDTO';
import Keycode from '../entities/Keycode';

class KeycodeRepository implements IKeycodesRepository {
  private ormRepository: Repository<Keycode>;

  constructor() {
    this.ormRepository = getRepository(Keycode);
  }

  //* -> create keycode on db
  public async create({
    keycode,
    gcm_id,
  }: ICreateKeycodesDTO): Promise<Keycode> {
    const key = this.ormRepository.create({ keycode, gcm_id });
    await this.ormRepository.save(key);

    return key;
  }

  //* -> update keycode on db
  public async update(keycode: Keycode): Promise<Keycode> {
    return this.ormRepository.save(keycode);
  }

  //* -> find keycode on db
  public async findById(id: string): Promise<Keycode | undefined> {
    const key = await this.ormRepository.findOne({ where: { id } });
    return key;
  }

  public async findByKeycode(keycode: string): Promise<Keycode | undefined> {
    const key = await this.ormRepository.findOne({ where: { keycode } });
    return key;
  }
}

export default KeycodeRepository;
