import { Request, Response } from 'express';

class EnderecoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const gcm_id = request.params;

    const {} = request.body;
  }
}
