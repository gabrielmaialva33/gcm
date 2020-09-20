import { inject, injectable } from 'tsyringe';

import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import Bairro from '@modules/endereco/infra/typeorm/entities/Bairro';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  codigo_bairro?: string;
  nome: string;
  observacao?: string;
  municipio: string;
}

@injectable()
class CreateBairroService {
  constructor(
    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository,

    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    codigo_bairro,
    nome,
    observacao,
    municipio,
  }: IRequest): Promise<Bairro> {
    //* find and check user
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Faça o login no sistema', 404);
    }
    if (!(user.regra === ('master' || 'admin'))) {
      throw new AppError('Usuário não permitido', 401);
    }

    //* -> find and check municipio exists
    const check_municipio = await this.municipiosRepository.findByName(
      municipio.toUpperCase(),
    );
    if (!check_municipio) {
      throw new AppError('Municipio não encontrado', 404);
    }

    const bairro = await this.bairrosRepository.create({
      codigo_bairro,
      nome,
      observacao,
      municipio_id: check_municipio.id,
    });

    return bairro;
  }
}

export default CreateBairroService;
