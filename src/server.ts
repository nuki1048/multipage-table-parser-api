import 'module-alias/register';

import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app';
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`XLSX API listening on port ${PORT}🤝. http://localhost:8000`);
});
