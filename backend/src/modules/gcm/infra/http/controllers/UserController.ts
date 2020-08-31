import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/gcm/services/user/CreateUserService';
import UpdateUserService from '@modules/gcm/services/user/UpdateUserService';
import DestroyUserService from '@modules/gcm/services/user/DestroyUserService';
import ShowUserService from '@modules/gcm/services/user/ShowUserService';

class UserControllers {
  //* -> show execute
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute(user_id);

    return response.json(classToClass(user));
  }

  //* -> create execute
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome_usuario, email, senha } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ nome_usuario, email, senha });

    return response.json(classToClass(user));
  }

  //* -> updade execute
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { nome_usuario, email, senha, velha_senha } = request.body;
    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id,
      nome_usuario,
      email,
      velha_senha,
      senha,
    });

    return response.json(classToClass(user));
  }

  //* -> delete execute
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const deleteUser = container.resolve(DestroyUserService);

    await deleteUser.execute(user_id);

    return response.json({ message: 'O usuário foi excluido.' });
  }
}

export default new UserControllers();
