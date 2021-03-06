import { inject, injectable } from 'tsyringe';

import IEnderecosRepository from '@modules/endereco/repositories/IEnderecosRepository';
import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import Endereco from '@modules/endereco/infra/typeorm/entities/Endereco';
import AppError from '@shared/errors/AppError';

interface IRequest {
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  codigo_endereco?: string;
  bairro_id: string;
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
    logradouro,
    numero,
    complemento,
    cep,
    codigo_endereco,
    bairro_id,
  }: IRequest): Promise<Endereco> {
    //* -> find and check bairro exist
    const bairro = await this.bairrosRepository.findById(bairro_id);
    if (!bairro) {
      throw new AppError('Bairro não encontrado', 404);
    }

    const endereco = await this.enderecosRepository.create({
      logradouro,
      numero,
      complemento,
      cep,
      codigo_endereco,
      bairro_id: bairro.id,
    });

    return endereco;
  }
}

export default CreateEnderecoServices;
