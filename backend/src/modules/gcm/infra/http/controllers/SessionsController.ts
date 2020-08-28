import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/gcm/services/user/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, nome_usuario, senha } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      nome_usuario,
      senha,
    });

    return response.json({ user: classToClass(user), token });
  }
}
export default new SessionsController();
