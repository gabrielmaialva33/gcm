import { container } from 'tsyringe';

import IGcmsRepository from '@modules/gcm/repositories/IGcmsRepository';
import GcmsRepository from '@modules/gcm/infra/typeorm/repositories/GcmsRepository';

import IDadosPessoaisRepository from '@modules/gcm/repositories/IDadosPessoaisRepository';
import DadosPessoaisRepository from '@modules/gcm/infra/typeorm/repositories/DadosPessoaisRepository';

import IUsersRepository from '@modules/gcm/repositories/IUsersRepository';
import UsersRepository from '@modules/gcm/infra/typeorm/repositories/UsersRepository';

import IEnderecosRepository from '@modules/gcm/repositories/IEnderecosRepository';
import EnderecosRepository from '@modules/gcm/infra/typeorm/repositories/EnderecosRepository';

//* -> gcms
container.registerSingleton<IGcmsRepository>('GcmsRepository', GcmsRepository);

container.registerSingleton<IDadosPessoaisRepository>(
  'DadosPessoaisRepository',
  DadosPessoaisRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IEnderecosRepository>(
  'EnderecosRepository',
  EnderecosRepository,
);
