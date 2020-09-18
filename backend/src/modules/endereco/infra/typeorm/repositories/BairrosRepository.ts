import { getRepository, Repository } from 'typeorm';

import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import ICreateBairrosDTO from '@modules/endereco/dtos/ICreateBairrosDTO';
import Bairro from '../entities/Bairro';

class BairrosRepository implements IBairrosRepository {
  private ormRepository: Repository<Bairro>;

  constructor() {
    this.ormRepository = getRepository(Bairro);
  }

  //* -> create on db
  public async create({
    codigo_bairro,
    nome,
    observacao,
    municipio_id,
  }: ICreateBairrosDTO): Promise<Bairro> {
    const bairro = await this.ormRepository.create({
      codigo_bairro,
      nome,
      observacao,
      municipio_id,
    });

    await this.ormRepository.save(bairro);

    return bairro;
  }

  //* -> update on db
  public async save(bairro: Bairro): Promise<Bairro> {
    return this.ormRepository.save(bairro);
  }

  //* -> find on db
  public async findById(bairro_id: string): Promise<Bairro | undefined> {
    const bairro = await this.ormRepository.findOne({
      where: { id: bairro_id },
    });

    return bairro;
  }

  public async findByCogigo(
    codigo_bairro: string,
  ): Promise<Bairro | undefined> {
    const bairro = await this.ormRepository.findOne({
      where: { codigo_bairro },
    });

    return bairro;
  }

  public async findByNome(nome: string): Promise<Bairro | undefined> {
    const bairro = await this.ormRepository.findOne({
      where: { nome },
    });

    return bairro;
  }
}

export default BairrosRepository;
