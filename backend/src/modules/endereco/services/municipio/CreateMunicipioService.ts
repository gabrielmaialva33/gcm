import { injectable, inject } from 'tsyringe';

import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import IEstadosRepository from '@modules/endereco/repositories/IEstadosRepository';
import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  codigo_ibge: string;
  municipio: string;
  gentilico: string;
  sigla: string;
}

@injectable()
class CreateMunicipioService {
  constructor(
    @inject('MunicipiosRepository')
    private municipioRepository: IMunicipiosRepository,

    @inject('EstadosRepository')
    private estadoRepository: IEstadosRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    codigo_ibge,
    municipio,
    gentilico,
    sigla,
  }: IRequest): Promise<Municipio> {
    //* find and check user
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Faça o login no sistema', 404);
    }
    if (!(user.regra === ('master' || 'admin'))) {
      throw new AppError('Usuário não permitido', 401);
    }

    //* find and check estado exists
    const estado = await this.estadoRepository.findBySigla(sigla);
    if (!estado) {
      throw new AppError('Estado não encontrado', 404);
    }

    const new_municipio = await this.municipioRepository.create({
      codigo_ibge,
      municipio,
      gentilico,
      estado_id: estado.id,
    });

    return new_municipio;
  }
}

export default CreateMunicipioService;
