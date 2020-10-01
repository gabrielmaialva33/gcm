import { Router } from 'express';

import usersRouter from '@modules/gcm/infra/http/routes/users.routes';
import sessionsRouter from '@modules/gcm/infra/http/routes/sessions.routes';

import gcmsRoutes from '@modules/gcm/infra/http/routes/gcms.routes';
import dadosPessoaisRoutes from '@modules/gcm/infra/http/routes/dados.pessoais.routes';
import enderecoGcmRoutes from '@modules/gcm/infra/http/routes/enderecos.gcm.routes';

const routes = Router();

//* -> GCM
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/gcms', gcmsRoutes);

routes.use('/data', dadosPessoaisRoutes);
routes.use('/address', enderecoGcmRoutes);

export default routes;
