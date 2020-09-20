import { container } from 'tsyringe';

import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import GcmsRepository from '@modules/gcm/infra/typeorm/repositories/GcmsRepository';

import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import DadosPessoaisRepository from '@modules/gcm/infra/typeorm/repositories/DadosPessoaisRepository';

import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import UsersRepository from '@modules/gcm/infra/typeorm/repositories/UsersRepository';

import IEstadosRepository from '@modules/endereco/repositories/IEstadosRepository';
import EstadosRepository from '@modules/endereco/infra/typeorm/repositories/EstadoRepository';

import IMunicipiosRepository from '@modules/endereco/repositories/IMunicipiosRepository';
import MunicipiosRepository from '@modules/endereco/infra/typeorm/repositories/MunicipiosRepository';

import IBairrosRepository from '@modules/endereco/repositories/IBairrosRepository';
import BairrosRepository from '@modules/endereco/infra/typeorm/repositories/BairrosRepository';

import IEnderecosRepository from '@modules/endereco/repositories/IEnderecosRepository';
import EnderecosRepository from '@modules/endereco/infra/typeorm/repositories/EnderecosRepository';

container.registerSingleton<IDadosPessoaisRepository>(
  'DadosPessoaisRepository',
  DadosPessoaisRepository,
);

//* -> endereco
container.registerSingleton<IEstadosRepository>(
  'EstadosRepository',
  EstadosRepository,
);

container.registerSingleton<IMunicipiosRepository>(
  'MunicipiosRepository',
  MunicipiosRepository,
);

container.registerSingleton<IBairrosRepository>(
  'BairrosRepository',
  BairrosRepository,
);

container.registerSingleton<IEnderecosRepository>(
  'EnderecosRepository',
  EnderecosRepository,
);

//* -> gcms
container.registerSingleton<IGcmsRepository>('GcmsRepository', GcmsRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
