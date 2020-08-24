import Gcm from '../infra/typeorm/entities/Gcm';
import ICreateGcmsDTO from '../dtos/ICreateGcmsDTO';

export default interface IGcmsRepository {
  create({ nome_guerra }: ICreateGcmsDTO): Promise<Gcm>;
  save(gcm: Gcm): Promise<Gcm>;
  findById(gcm_id: string): Promise<Gcm | undefined>;
  finkByMatricula(matricula_gcm: number): Promise<Gcm | undefined>;
}
