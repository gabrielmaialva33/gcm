import { getRepository, Repository } from 'typeorm';

import IEnderecosRepository from '@modules/endereco/repositories/IEnderecosRepository';
import ICreateEnderecosDTO from '@modules/endereco/dtos/ICreateEnderecosDTO';
import Endereco from '../entities/Endereco';

class EnderecosRepository implements IEnderecosRepository {
  private ormRepository: Repository<Endereco>;

  constructor() {
    this.ormRepository = getRepository(Endereco);
  }

  //* -> create on db
  public async create({
    logradouro,
    numero,
    complemento,
    cep,
    codigo_endereco,
    bairro_id,
  }: ICreateEnderecosDTO): Promise<Endereco> {
    const endereco = this.ormRepository.create({
      logradouro,
      numero,
      complemento,
      cep,
      codigo_endereco,
      bairro_id,
    });

    await this.ormRepository.save(endereco);

    return endereco;
  }

  //* -> update on db
  public async save(endereco: Endereco): Promise<Endereco> {
    return this.ormRepository.save(endereco);
  }

  //* -> find on db
  public async findById(endereco_id: string): Promise<Endereco | undefined> {
    const enderecos = await this.ormRepository.findOne({
      where: { id: endereco_id },
    });

    return enderecos;
  }
}

export default EnderecosRepository;
