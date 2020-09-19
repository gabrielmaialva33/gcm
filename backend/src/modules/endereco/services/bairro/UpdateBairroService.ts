import { inject, injectable } from 'tsyringe';

import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import Bairro from '@modules/endereco/infra/typeorm/entities/Bairro';
import AppError from '@shared/errors/AppError';

interface IRequest {
  bairro_id: string;
  codigo_bairro: string;
  nome: string;
  observacao: string;
  municipio: string;
}

@injectable()
class UpdateBairroService {
  constructor(
    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository,

    @inject('MunicipioRepository')
    private municipiosRepository: IMunicipiosRepository,
  ) {}

  public async execute({
    bairro_id,
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

    const update_bairro = await this.bairrosRepository.findById(bairro_id);
    if (!update_bairro) {
      throw new AppError('Bairro não encontrado', 404);
    }

    //* -> update data bairro
    update_bairro.codigo_bairro = codigo_bairro;
    update_bairro.nome = nome;
    update_bairro.observacao = observacao;
    update_bairro.municipio_id = check_municipio.id;

    await this.bairrosRepository.save(update_bairro);

    return update_bairro;
  }
}

export default UpdateBairroService;
