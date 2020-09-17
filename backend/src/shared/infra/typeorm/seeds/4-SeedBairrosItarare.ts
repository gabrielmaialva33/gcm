import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import XLSX from 'xlsx';

import Municipio from '@modules/endereco/infra/typeorm/entities/Municipio';
import Bairro from '@modules/endereco/infra/typeorm/entities/Bairro';

export default class SeedBairrosItarare implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //* -> get municipio_id
    const cidadeRepo = getRepository(Municipio);

    const municipio = await cidadeRepo
      .findOne({ where: { codigo_ibge: '3523206', municipio: 'Itararé' } })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });

    //* -> check estado exists
    if (!municipio) {
      throw new Error('Estado não encontrado');
    }

    //* -> xlsx to json
    const file = XLSX.readFile(`${__dirname}/xlsx/seed_bairros_itarare.xlsx`);

    //* -> looping municipio_id
    for (let i = 2; i <= 86; i += 1) {
      XLSX.utils.sheet_add_json(
        file.Sheets.data,
        [{ municipio_id: municipio.id }],
        {
          header: ['municipio_id'],
          skipHeader: true,
          origin: `C${i}`,
        },
      );
    }

    const sheet = file.SheetNames;

    // console.log(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]]));

    await connection
      .createQueryBuilder()
      .insert()
      .into(Bairro)
      .values(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]]))
      .execute()
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(` ❌  ${err.message}`);
      });
  }
}
