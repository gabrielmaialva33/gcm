import { Router } from 'express';

import GcmController from '../controllers/GcmController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const gcmsRoutes = Router();

gcmsRoutes.use(ensureAuthenticated);

gcmsRoutes.post('/', GcmController.create);

export default gcmsRoutes;
