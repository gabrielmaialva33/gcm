import { Router } from 'express';

import usersRouter from '@modules/gcm/infra/http/routes/users.routes';
import sessionsRouter from '@modules/gcm/infra/http/routes/sessions.routes';

import dadosPessoaisRouter from '@modules/gcm/infra/http/routes/dados_pessoais.routes';

import gcmsRoutes from '@modules/gcm/infra/http/routes/gcms.routes';

const routes = Router();

//* -> GCM
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/dados_pessoais', dadosPessoaisRouter);

routes.use('/gcms', gcmsRoutes);
export default routes;
