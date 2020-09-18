import ICreateMunicipioDTO from '../dtos/ICreateMunicipioDTO';
import Municipio from '../infra/typeorm/entities/Municipio';

export default interface IMunicipiosRepository {
  create(data: ICreateMunicipioDTO): Promise<Municipio>;
  save(municipio: Municipio): Promise<Municipio>;
  findById(municipio_id: string): Promise<Municipio | undefined>;
  findByName(municipio_name: string): Promise<Municipio | undefined>;
}
