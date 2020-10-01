import { Router } from 'express';

import DadosPessoaisController from '../controllers/DadosPessoaisController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const dadosPessoaisRoutes = Router();

dadosPessoaisRoutes.use(ensureAuthenticated);
dadosPessoaisRoutes.put('/:gcm_id', DadosPessoaisController.update);

export default dadosPessoaisRoutes;
