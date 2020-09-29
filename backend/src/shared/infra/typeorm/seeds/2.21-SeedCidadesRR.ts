import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import XLSX from 'xlsx';

import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';
import Estado from '@modules/endereco/infra/typeorm/entities/Estado';

export default class SeedCidadesRR implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //* -> get estado_id
    const estadoRepo = getRepository(Estado);

    const estado = await estadoRepo
      .findOne({ where: { codigo_ibge: '14' } })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });

    //* -> check estado exists
    if (!estado) {
      throw new Error(' ❌ Estado não encontrado');
    }

    //* -> xlsx to json
    const file = XLSX.readFile(`${__dirname}/xlsx/seed_cidades_rr.xlsx`);
    const sheet = file.SheetNames;

    //* -> looping estado_id
    for (let i = 2; i <= 16; i += 1) {
      XLSX.utils.sheet_add_json(
        file.Sheets[sheet[0]],
        [{ estado_id: estado.id }],
        {
          header: ['estado_id'],
          skipHeader: true,
          origin: `D${i}`,
        },
      );
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Municipio)
      .values(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]]))
      .execute()
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });
  }
}
