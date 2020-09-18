import Endereco from '../infra/typeorm/entities/Endereco';
import ICreateEnderecosDTO from '../dtos/ICreateEnderecosDTO';

export default interface IEnderecosRepository {
  create(data: ICreateEnderecosDTO): Promise<Endereco>;
  save(endereco: Endereco): Promise<Endereco>;
  findById(endereco_id: string): Promise<Endereco | undefined>;
}
