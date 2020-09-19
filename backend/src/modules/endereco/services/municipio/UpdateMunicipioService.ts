import { injectable, inject } from 'tsyringe';

import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';
import IEstadosRepository from '@modules/endereco/repositories/IEstadosRepository';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  municipio_id: string;
  codigo_ibge: string;
  municipio: string;
  gentilico: string;
  sigla: string;
}

@injectable()
class UpdateMunicipioService {
  constructor(
    @inject('MunicipiosRepository')
    private municipioRepository: IMunicipiosRepository,

    @inject('EstadosRepository')
    private estadoRepository: IEstadosRepository,
  ) {}

  public async execute({
    municipio_id,
    codigo_ibge,
    municipio,
    gentilico,
    sigla,
  }: IRequest): Promise<Municipio> {
    //* find and check estado exists
    const estado = await this.estadoRepository.findBySigla(sigla);
    if (!estado) {
      throw new AppError('Estado não encontrado', 404);
    }

    const new_municipio = await this.municipioRepository.findById(municipio_id);
    if (!new_municipio) {
      throw new AppError('Municipio não encontrado', 404);
    }

    //* -> update data municipio
    new_municipio.codigo_ibge = codigo_ibge;
    new_municipio.municipio = municipio;
    new_municipio.gentilico = gentilico;
    new_municipio.estado_id = estado.id;

    await this.municipioRepository.save(new_municipio);

    return new_municipio;
  }
}

export default UpdateMunicipioService;
