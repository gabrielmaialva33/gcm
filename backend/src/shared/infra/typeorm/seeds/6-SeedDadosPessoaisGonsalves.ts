import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';

import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';
import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';

export default class SeedDadosPessoaisGonsalves implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const cidadeRepo = getRepository(Municipio);

    const municipio = await cidadeRepo
      .findOne({
        where: { codigo_ibge: '3113503', municipio: 'Carbonita' },
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });

    //* -> check estado exists
    if (!municipio) {
      throw new Error('Municipio não encontrado');
    }

    //* inser values on dados_pessoais
    await connection
      .createQueryBuilder()
      .insert()
      .into(DadosPessoais)
      .values({
        nome: 'Sebastião Ademar Gonçalves',
        rg: '377953611',
        cpf: '72042940682',
        telefone: ['1535314445'],
        celular: ['15996962874'],
        nome_mae: 'José Gonçalves Rosa',
        nome_pai: 'Sebastiana Rosa dos Santos',
        data_nascimento: '08-13-1971',
        municipio_nascimento_id: municipio.id,
        sexo: 'masculino',
        tipo_sanguineo: 'O+',
        estado_civil: 'casado',
        profissao: [''],
        escolaridade: '2º	Grau Completo',
        nome_conjulge: '',
        nome_filhos: ['Vitoria Caroline Gonçalves', 'Julia Gonçalves'],
        titulo_eleitor: '101811660272',
        zona_eleitoral: '057011',
        cnh: '02737170006',
        validade_cnh: '04-05-2020',
        tipo_cnh: 'C',
        observacao: '',
      })
      .execute()
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });
  }
}
