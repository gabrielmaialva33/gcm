import { createConnections } from 'typeorm';

createConnections()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('🗃️  Database connected.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log(` ❌  ${err.message}`);
  });
