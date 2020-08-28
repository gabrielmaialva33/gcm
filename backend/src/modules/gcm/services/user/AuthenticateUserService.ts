import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/gcm/infra/typeorm/entities/User';

interface Resquest {
  email: string;
  nome_usuario: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserServece {
  public async execute({
    email,
    nome_usuario,
    senha,
  }: Resquest): Promise<Response> {
    const usersRepository = getRepository(User);

    const userEmail = await usersRepository.findOne({ where: { email } });
    const userNomeUsuário = await usersRepository.findOne({
      where: { nome_usuario },
    });

    //* -> checks user exists
    if (!userEmail || !userNomeUsuário) {
      throw new AppError('E-mail ou Senha não conferem.', 401);
    }

    const passwordMatched = await compare(
      senha,
      userEmail ? userEmail.senha : userNomeUsuário.senha,
    );

    if (!passwordMatched) {
      throw new AppError('E-mail ou Senha não conferem.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userEmail.id || userNomeUsuário.id,
      expiresIn,
    });

    return {
      user: userEmail || userNomeUsuário,
      token,
    };
  }
}

export default AuthenticateUserServece;
