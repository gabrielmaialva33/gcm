import { inject, injectable } from 'tsyringe';
import {} from 'validator';

import IEnderecosRepository from '@modules/endereco/repositories/IEnderecosRepository';
import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import Endereco from '@modules/endereco/infra/typeorm/entities/Endereco';
import AppError from '@shared/errors/AppError';
import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';

interface IRequest {
  user_id: string;
  gcm_id: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  municipio: string;
}

@injectable()
class UpdateEnderecoGcmServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,

    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository,

    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository,
  ) {}

  public async execute({
    user_id,
    gcm_id,
    logradouro,
    numero,
    complemento,
    cep,
    bairro,
  }: IRequest): Promise<Endereco> {
    //* -> find and check user exists and permitions
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    if (!(user.regra === ('master' || 'admin'))) {
      throw new AppError('Usuário não permitido', 401);
    }

    //* -> find and check gcm exists
    const gcm = await this.gcmsRepository.findById(gcm_id);
    if (!gcm) {
      throw new AppError('Gcm não encontrado', 404);
    }

    //* -> find and check bairro exist
    const bairro_id = await this.bairrosRepository.findByNome(bairro);
    if (!bairro_id) {
      throw new AppError('Bairro não encontrado', 404);
    }

    //* -> find and check endereco exists
    const endereco = await this.enderecosRepository.findById(gcm.endereco_id);
    if (!endereco) {
      throw new AppError('Endereço não encontrado', 404);
    }

    //* -> update data endereco
    endereco.logradouro = logradouro;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.cep = cep;
    endereco.bairro_id = bairro_id.id;

    await this.enderecosRepository.save(endereco);

    return endereco;
  }
}

export default UpdateEnderecoGcmServices;
