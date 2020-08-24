import { getRepository, Repository } from 'typeorm';

import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import ICreateGcmsDTO from '@modules/gcm/dtos/ICreateGcmsDTO';
import Gcm from '../entities/Gcm';

class GcmsRepository implements IGcmsRepository {
  private ormRepository: Repository<Gcm>;

  constructor() {
    this.ormRepository = getRepository(Gcm);
  }

  //* ->  create on db
  public async create({ nome_guerra }: ICreateGcmsDTO): Promise<Gcm> {
    const gcm = this.ormRepository.create({ nome_guerra });
    await this.ormRepository.save(gcm);

    return gcm;
  }

  //* -> save on db
  public async save(gcm: Gcm): Promise<Gcm> {
    return this.ormRepository.save(gcm);
  }

  //* -> find on db
  public async findById(id: string): Promise<Gcm | undefined> {
    const gcm = await this.ormRepository.findOne({ where: { id } });

    return gcm;
  }

  public async finkByMatricula(
    matricula_gcm: number,
  ): Promise<Gcm | undefined> {
    const gcm = await this.ormRepository.findOne({ where: { matricula_gcm } });
    return gcm;
  }
}

export default GcmsRepository;
