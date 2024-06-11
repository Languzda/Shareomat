import express, { Express } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

import userRoute from './routes/user';
import cardRoute from './routes/card';
import offerRoute from './routes/offer';
import { errorHandler } from './middlewares/errors';
import { fileStorage, fileFilter } from './storage/fileStorage';
import multer from 'multer';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use((req, res, next) => {
  const body = req.body;
  const endpoint = req.originalUrl;
  console.log('Request body:', body, 'path:', endpoint);
  next();
});

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/data/images', express.static('data/images'));

app.use('/user', userRoute);
app.use('/card', cardRoute);
app.use('/offer', offerRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
