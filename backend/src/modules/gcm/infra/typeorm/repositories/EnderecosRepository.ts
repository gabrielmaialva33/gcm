import { getRepository, Repository } from 'typeorm';

import IEnderecosRepository from '@modules/gcm/repositories/IEnderecosRepository';
import ICreateEnderecosDTO from '@modules/gcm/dtos/ICreateEnderecosDTO';
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
    bairro,
    complemento,
    estado,
    cidade,
    cep,
  }: ICreateEnderecosDTO): Promise<Endereco> {
    const endereco = this.ormRepository.create({
      logradouro,
      numero,
      bairro,
      complemento,
      estado,
      cidade,
      cep,
    });

    await this.ormRepository.save(endereco);

    return endereco;
  }

  //* -> save on db
  public async save(endereco: Endereco): Promise<Endereco> {
    return this.ormRepository.save(endereco);
  }

  //* -> find on db
  public async findById(id: string): Promise<Endereco | undefined> {
    const enderecos = await this.ormRepository.findOne({ where: { id } });

    return enderecos;
  }
}

export default EnderecosRepository;
