import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/gcm/infra/typeorm/entities/User';

interface Resquest {
  nome_usuario: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserServece {
  public async execute({ nome_usuario, senha }: Resquest): Promise<Response> {
    const usersRepository = getRepository(User);

    const userName = await usersRepository.findOne({
      where: { nome_usuario },
    });

    //* -> checks user exists
    if (!userName) {
      throw new AppError('Nome de usuário ou Senha não conferem.', 401);
    }

    const passwordMatched = await compare(senha, userName.senha);

    if (!passwordMatched) {
      throw new AppError('Nome de usuário ou Senha não conferem.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userName.id,
      expiresIn,
    });

    return {
      user: userName,
      token,
    };
  }
}

export default AuthenticateUserServece;
