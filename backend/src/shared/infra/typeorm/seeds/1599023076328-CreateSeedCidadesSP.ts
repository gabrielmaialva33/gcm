import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import XLSX from 'xlsx';

import Cidade from '@modules/endereco/infra/typeorm/entities/Cidade';
import Estado from '@modules/endereco/infra/typeorm/entities/Estado';

export default class CreateSeedCidadesSP implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //* -> get estado_id
    const estadoRepo = getRepository(Estado);

    const estado = await estadoRepo
      .findOne({ where: { codigo_ibge: '35' } })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });

    //* -> check estado exists
    if (!estado) {
      throw new Error('erro');
    }

    //* -> xlsx to json
    const file = XLSX.readFile(`${__dirname}/xlsx/seed_cidades_sp.xlsx`);

    //* -> looping estado_id
    for (let i = 2; i <= 646; i += 1) {
      XLSX.utils.sheet_add_json(file.Sheets.data, [{ estado_id: estado.id }], {
        header: ['estado_id'],
        skipHeader: true,
        origin: `D${i}`,
      });
    }

    const sheet = file.SheetNames;

    await connection
      .createQueryBuilder()
      .insert()
      .into(Cidade)
      .values(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]]))
      .execute();
  }
}
