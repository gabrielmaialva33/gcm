import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/gcm/services/user/CreateUserService';

class UserControllers {
  //* -> create execute
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome_usuario, email, senha } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ nome_usuario, email, senha });

    return response.json(classToClass(user));
  }
}

export default UserControllers;
