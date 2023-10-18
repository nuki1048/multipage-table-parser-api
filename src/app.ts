import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import api from './api';

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', api);

export default app;
