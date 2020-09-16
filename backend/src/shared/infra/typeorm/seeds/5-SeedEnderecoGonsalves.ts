import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';

import Endereco from '@modules/endereco/infra/typeorm/entities/Endereco';
import Bairro from '@modules/endereco/infra/typeorm/entities/Bairro';

export default class SeedEnderecoGonsalves implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const bairroRepo = getRepository(Bairro);

    const bairro = await bairroRepo
      .findOne({
        where: { codigo_bairro: '1-02', nome: 'Vila Santa Terezinha' },
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });

    if (!bairro) {
      throw new Error('Bairro não encontrado');
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Endereco)
      .values({
        logradouro: 'Rua João Prado Margarido',
        numero: '249',
        complemento: '',
        cep: '18460-000',
        codigo_endereco: '',
        bairro_id: bairro.id,
      })
      .execute();
  }
}
