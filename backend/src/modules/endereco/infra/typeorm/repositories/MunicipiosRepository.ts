import { Repository, getRepository } from 'typeorm';

import ICreateMunicipioDTO from '@modules/endereco/dtos/ICreateMunicipioDTO';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import Municipio from '../entities/Municipio';

class MunicipiosRepository implements IMunicipiosRepository {
  private ormRepository: Repository<Municipio>;

  constructor() {
    this.ormRepository = getRepository(Municipio);
  }

  //* -> create on db
  public async create({
    codigo_ibge,
    municipio,
    gentilico,
    estado_id,
  }: ICreateMunicipioDTO): Promise<Municipio> {
    const new_municipio = this.ormRepository.create({
      codigo_ibge,
      municipio,
      gentilico,
      estado_id,
    });

    await this.ormRepository.save(new_municipio);

    return new_municipio;
  }

  //* -> update on db
  public async save(municipio: Municipio): Promise<Municipio> {
    return this.ormRepository.save(municipio);
  }

  //* -> find on db
  public async findById(municipio_id: string): Promise<Municipio | undefined> {
    const municipio = await this.ormRepository.findOne({
      where: { id: municipio_id },
    });

    return municipio;
  }

  public async findByName(
    municipio_name: string,
  ): Promise<Municipio | undefined> {
    const municipio = await this.ormRepository.findOne({
      where: { municipio: municipio_name },
    });

    return municipio;
  }
}

export default MunicipiosRepository;
