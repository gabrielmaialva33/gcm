import Gcm from '../infra/typeorm/entities/Gcm';
import ICreateGcmsDTO from '../dtos/ICreateGcmsDTO';

export default interface IGcmsRepository {
  create(data: ICreateGcmsDTO): Promise<Gcm>;
  save(gcm: Gcm): Promise<Gcm>;
  findById(gcm_id: string): Promise<Gcm | undefined>;
  findByNomeGuerra(nome_guerra: string): Promise<Gcm | undefined>;
  finkByMatricula(matricula_gcm: number): Promise<Gcm | undefined>;
}
