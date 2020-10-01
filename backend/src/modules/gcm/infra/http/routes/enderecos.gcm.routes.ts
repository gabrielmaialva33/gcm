import { Router } from 'express';

import EnderecoGcmController from '../controllers/EnderecoGcmController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const gcmsEnderecoRoutes = Router();

gcmsEnderecoRoutes.use(ensureAuthenticated);

gcmsEnderecoRoutes.put('/:gcm_id', EnderecoGcmController.update);

export default gcmsEnderecoRoutes;
