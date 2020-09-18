import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/gcm/infra/typeorm/entities/User';
import Gcm from '@modules/gcm/infra/typeorm/entities/Gcm';

export default class SeedUserGonsalves implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const gcmRepo = getRepository(Gcm);

    const gcm = await gcmRepo
      .findOne({ where: { matricula_gcm: 1 } })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });
    if (!gcm) {
      throw new Error(' ❌  Gcm não encontrado');
    }

    //* -> hash password
    const hashedSenha = await hash('12345678', 8);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        nome_usuario: 'gonsalves',
        email: 'gonsalves@gmail.com',
        senha: hashedSenha,
        regra: 'master',
        avatar: '',
        gcm_id: gcm.id,
      })
      .execute()
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });
  }
}
