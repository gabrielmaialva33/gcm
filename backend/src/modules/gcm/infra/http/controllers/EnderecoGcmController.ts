import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateEnderecoGcmServices from '@modules/gcm/services/endereco/UpdateEnderecoGcmServices';

class EnderecoGcmController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { gcm_id } = request.params;
    const {
      bairro,
      municipio,
      logradouro,
      numero,
      complemento,
      cep,
    } = request.body;

    const updateEnderecoGcm = container.resolve(UpdateEnderecoGcmServices);
    const endereco = await updateEnderecoGcm.execute({
      user_id,
      gcm_id,
      bairro,
      municipio,
      logradouro,
      numero,
      complemento,
      cep,
    });

    return response.json(classToClass(endereco));
  }
}

export default new EnderecoGcmController();
