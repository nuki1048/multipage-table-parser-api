// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-import
import 'module-alias/register';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`XLSX API listening on port ${PORT}🤝. http://localhost:8000`);
});
