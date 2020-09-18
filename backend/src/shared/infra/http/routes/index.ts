import { Router } from 'express';

import usersRouter from '@modules/gcm/infra/http/routes/users.routes';
import sessionsRouter from '@modules/gcm/infra/http/routes/sessions.routes';

const routes = Router();

//* -> GCM
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
