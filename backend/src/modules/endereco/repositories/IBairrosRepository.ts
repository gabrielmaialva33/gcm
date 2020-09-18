import ICreateBairrosDTO from '../dtos/ICreateBairrosDTO';
import Bairro from '../infra/typeorm/entities/Bairro';

export default interface IBairrosRepository {
  create(data: ICreateBairrosDTO): Promise<Bairro>;
  save(bairro: Bairro): Promise<Bairro>;
  findById(bairro_id: string): Promise<Bairro | undefined>;
  findByCogigo(codigo_bairro: string): Promise<Bairro | undefined>;
  findByNome(nome: string): Promise<Bairro | undefined>;
}
