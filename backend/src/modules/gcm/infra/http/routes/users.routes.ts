import { Router } from 'express';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserController from '../controllers/UserController';

const usersRouter = Router();

usersRouter.get('/', UserController.show);
usersRouter.post('/', UserController.create);
// usersRouter.use(ensureAuthenticated);
usersRouter.put('/', UserController.update);
usersRouter.delete('/', UserController.delete);

export default usersRouter;
