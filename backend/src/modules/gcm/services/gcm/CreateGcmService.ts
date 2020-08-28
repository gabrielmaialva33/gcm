import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import Gcm from '@modules/gcm/infra/typeorm/entities/Gcm';

interface IRequest {
  nome_guerra: string;
}

@injectable()
class CreateCgmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,
  ) {}

  public async execute({ nome_guerra }: IRequest): Promise<Gcm> {
    //* -> checker exists
    const nomeGuerraExists = await this.gcmsRepository.findByNomeGuerra(
      nome_guerra,
    );
    if (nomeGuerraExists) {
      throw new AppError('Nome de guerra já cadastrado.', 409);
    }

    //* -> save on db
    const gcm = this.gcmsRepository.create({
      nome_guerra,
    });

    return gcm;
  }
}

export default CreateCgmService;
