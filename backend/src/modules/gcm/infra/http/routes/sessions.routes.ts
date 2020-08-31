import { Router } from 'express';

import SessionsController from '@modules/gcm/infra/http/controllers/SessionsController';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionsController.create);

export default sessionsRouter;
