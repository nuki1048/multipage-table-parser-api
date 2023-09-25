import express, { Express } from 'express';
import cors from 'cors';
import api from './api/';

const app: Express = express();

app.use(cors());

app.use('/api', api);

export default app;
