import { injectable, inject } from 'tsyringe';

import IEnderecosRepository from '@modules/gcm/repositories/IEnderecosRepository';
import Endereco from '@modules/gcm/infra/typeorm/entities/Endereco';

interface IRequest {
  logradouro: string;
  numero: number;
  bairro: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  codigo: string;
}

@injectable()
class CreateEnderecosServices {
  constructor(
    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository,
  ) {}

  public async execute({
    logradouro,
    numero,
    bairro,
    complemento,
    estado,
    cidade,
    cep,
    codigo,
  }: IRequest): Promise<Endereco> {
    // ? create checks?
    const endereco = await this.enderecosRepository.create({
      logradouro,
      numero,
      bairro,
      complemento,
      estado,
      cidade,
      cep,
      codigo,
    });

    return endereco;
  }
}

export default CreateEnderecosServices;
