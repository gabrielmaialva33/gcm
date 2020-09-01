import { injectable, inject } from 'tsyringe';
import IEnderecosRepository from '@modules/gcm/repositories/IEnderecosRepository';

import Endereco from '@modules/gcm/infra/typeorm/entities/Endereco';

interface IRequest {
  
}

@injectable()
class UpdateEnderecosService {
  constructor(
    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository,
  ) {}

  public async execute({ d }: IRequest): Promise<Endereco> {}
}

export default UpdateEnderecosService;
