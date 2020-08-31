import { Router } from 'express';

import usersRouter from '@modules/gcm/infra/http/routes/users.routes';

const routes = Router();

//* -> GCM
routes.use('/users', usersRouter);

export default routes;
