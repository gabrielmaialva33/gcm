import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import XLSX from 'xlsx';

import Estado from '@modules/endereco/infra/typeorm/entities/Estado';

export default class CreateSeedEstados implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //* -> xlsx to json
    const file = XLSX.readFile(`${__dirname}/xlsx/seed_estado.xlsx`);
    const sheet = file.SheetNames;

    // eslint-disable-next-line no-console
    // console.log(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]]));

    await connection
      .createQueryBuilder()
      .insert()
      .into(Estado)
      .values(XLSX.utils.sheet_to_json(file.Sheets[sheet[0]]))
      .execute();
  }
}
