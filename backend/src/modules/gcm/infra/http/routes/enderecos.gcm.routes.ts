import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const gcmsEnderecoRoutes = Router();

gcmsEnderecoRoutes.use(ensureAuthenticated);

gcmsEnderecoRoutes.put('/:gcm_id');

export default gcmsEnderecoRoutes;
