import { injectable, inject } from 'tsyringe';

import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';
import IEstadosRepository from '@modules/endereco/repositories/IEstadosRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
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
  ) {}

  public async execute({
    codigo_ibge,
    municipio,
    gentilico,
    sigla,
  }: IRequest): Promise<Municipio> {
    //* find and check estado exists
    const estado = await this.estadoRepository.findBySigla(sigla);
    if (!estado) {
      throw new AppError('Erro: Estado não encontrado', 404);
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
