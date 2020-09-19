import { inject, injectable } from 'tsyringe';

import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import Bairro from '@modules/endereco/infra/typeorm/entities/Bairro';
import AppError from '@shared/errors/AppError';

interface IRequest {
  codigo_bairro: string;
  nome: string;
  observacao: string;
  municipio: string;
}

injectable();
class CreateBairroService {
  constructor(
    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository,

    @inject('MunicipioRepository')
    private municipiosRepository: IMunicipiosRepository,
  ) {}

  public async execute({
    codigo_bairro,
    nome,
    observacao,
    municipio,
  }: IRequest): Promise<Bairro> {
    //* -> find and check municipio exists
    const check_municipio = await this.municipiosRepository.findByName(
      municipio,
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
