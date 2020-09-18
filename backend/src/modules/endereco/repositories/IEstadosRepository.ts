import Estado from '../infra/typeorm/entities/Estado';

export default interface IEstadosRepository {
  save(estado: Estado): Promise<Estado>;
  findById(estado_id: string): Promise<Estado | undefined>;
  findByUf(uf: string): Promise<Estado | undefined>;
  findBySigla(sigla: string): Promise<Estado | undefined>;
}
