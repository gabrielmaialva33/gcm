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
  public async create({
    nome_guerra,
    senha,
    avatar,
  }: ICreateGcmsDTO): Promise<Gcm> {
    const gcm = this.ormRepository.create({ nome_guerra, senha, avatar });
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

  public async findByEmail(email: string): Promise<Gcm | undefined> {
    const gcm = await this.ormRepository.findOne({ where: { email } });

    return gcm;
  }

  public async findByNomeUsuario(
    nome_usuario: string,
  ): Promise<Gcm | undefined> {
    const gcm = await this.ormRepository.findOne({ where: { nome_usuario } });

    return gcm;
  }
}

export default GcmsRepository;
