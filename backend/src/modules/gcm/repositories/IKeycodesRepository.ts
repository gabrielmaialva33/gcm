import ICreateKeycodesDTO from '../dtos/ICreateKeycodesDTO';
import Keycode from '../infra/typeorm/entities/Keycode';

export default interface IKeycodesRepository {
  create(data: ICreateKeycodesDTO): Promise<Keycode>;
  update(keycode: Keycode): Promise<Keycode>;
  findById(keycode_id: string): Promise<Keycode | undefined>;
  findByKeycode(keycode: string): Promise<Keycode | undefined>;
}
