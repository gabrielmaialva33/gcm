import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

//* ->  database
import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.HTTP_PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.log(` 🚀 Servidor iniciado. `);
});
