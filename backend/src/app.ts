import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import { routes } from './routes/index';
import { notFound } from './middlewares/not-found.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export { app };
