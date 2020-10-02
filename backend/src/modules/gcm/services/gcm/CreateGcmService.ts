import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import Gcm from '@modules/gcm/infra/typeorm/entities/Gcm';

interface IRequest {
  nome_guerra: string;
  dados_pessoais_id: string;
  endereco_id: string;
  atribuicao: string;
}

@injectable()
class CreateCgmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,
  ) {}

  public async execute({
    nome_guerra,
    dados_pessoais_id,
    endereco_id,
    atribuicao,
  }: IRequest): Promise<Gcm> {
    //* -> checker exists
    const nomeGuerraExists = await this.gcmsRepository.findByNomeGuerra(
      nome_guerra,
    );
    if (nomeGuerraExists) {
      throw new AppError('Nome de guerra já cadastrado.', 409);
    }

    //* -> save on db
    const gcm = await this.gcmsRepository.create({
      nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao,
    });

    return gcm;
  }
}

export default CreateCgmService;
