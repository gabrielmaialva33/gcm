import { Router } from 'express';
import DadosPessoaisController from '../controllers/DadosPessoaisController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const dadosPessoaisRouter = Router();

dadosPessoaisRouter.use(ensureAuthenticated);

dadosPessoaisRouter.post('/', DadosPessoaisController.create);
dadosPessoaisRouter.put('/', DadosPessoaisController.update);

export default dadosPessoaisRouter;
