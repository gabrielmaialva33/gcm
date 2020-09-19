import { inject, injectable } from 'tsyringe';

import IEnderecosRepository from '@modules/endereco/repositories/IEnderecosRepository';
import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import Endereco from '@modules/endereco/infra/typeorm/entities/Endereco';
import AppError from '@shared/errors/AppError';

interface IRequest {
  endereco_id: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  codigo_endereco: string;
  bairro: string;
}

@injectable()
class CreateEnderecoServices {
  constructor(
    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository,

    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository,
  ) {}

  public async execute({
    endereco_id,
    logradouro,
    numero,
    complemento,
    cep,
    codigo_endereco,
    bairro,
  }: IRequest): Promise<Endereco> {
    //* -> find and check bairro exist
    const bairro_id = await this.bairrosRepository.findByNome(bairro);
    if (!bairro_id) {
      throw new AppError('Bairro não encontrado', 404);
    }

    //* -> find and check endereco exists
    const endereco = await this.enderecosRepository.findById(endereco_id);
    if (!endereco) {
      throw new AppError('Endereço não encontrado', 404);
    }

    //* -> update data endereco
    endereco.logradouro = logradouro;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.cep = cep;
    endereco.codigo_endereco = codigo_endereco;
    endereco.bairro_id = bairro_id.id;

    await this.enderecosRepository.save(endereco);

    return endereco;
  }
}

export default CreateEnderecoServices;
