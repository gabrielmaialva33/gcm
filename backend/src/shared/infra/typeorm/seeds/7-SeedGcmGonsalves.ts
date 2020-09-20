import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';

import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import Endereco from '@modules/endereco/infra/typeorm/entities/Endereco';
import Gcm from '@modules/gcm/infra/typeorm/entities/Gcm';

export default class SeedGcmGonsalves implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dadosPessoaisRepo = getRepository(DadosPessoais);
    const enderecoRepo = getRepository(Endereco);

    //* -> find dados_pessoais
    const dados_pessoais = await dadosPessoaisRepo
      .findOne({
        where: { cpf: '72042940682', rg: '377953611' },
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌   ${err.message}`);
      });
    if (!dados_pessoais) {
      throw new Error(' ❌  Dados Pessoais não encontrado');
    }

    //* -> find endereco
    const endereco = await enderecoRepo
      .findOne({
        where: { logradouro: 'RUA JOÃO PRADO MARGARIDO', numero: '249' },
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });
    if (!endereco) {
      throw new Error(' ❌  Endereço não encontrado');
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Gcm)
      .values({
        dados_pessoais_id: dados_pessoais.id,
        endereco_id: endereco.id,
        nome_guerra: 'Gonsalves',
        atribuicao: 'administrativo',
        historico: [''],
        status: true,
      })
      .execute()
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });
  }
}
