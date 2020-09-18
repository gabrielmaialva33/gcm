import { getRepository, Repository } from 'typeorm';

import IEstadosRepository from '@modules/endereco/repositories/IEstadosRepository';
import Estado from '../entities/Estado';

class EstadosRepository implements IEstadosRepository {
  private ormRepository: Repository<Estado>;

  constructor() {
    this.ormRepository = getRepository(Estado);
  }

  //* -> update on db
  public async save(estado: Estado): Promise<Estado> {
    return this.ormRepository.save(estado);
  }

  //* -> find on db
  public async findById(estado_id: string): Promise<Estado | undefined> {
    const estado = await this.ormRepository.findOne({
      where: { id: estado_id },
    });

    return estado;
  }

  public async findByUf(uf: string): Promise<Estado | undefined> {
    const estado = await this.ormRepository.findOne({
      where: { uf },
    });

    return estado;
  }

  public async findBySigla(sigla: string): Promise<Estado | undefined> {
    const estado = await this.ormRepository.findOne({
      where: { sigla },
    });

    return estado;
  }
}

export default EstadosRepository;
