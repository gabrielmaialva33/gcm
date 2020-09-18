import { container } from 'tsyringe';

import IHashProvider from '@modules/gcm/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/gcm/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
