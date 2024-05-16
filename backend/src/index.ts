import express, { Express } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

import userRoute from './routes/user';
import cardRoute from './routes/card';
import offerRoute from './routes/offer';
import { errorHandler } from './middlewares/errors';
import { isAuth } from './middlewares/isAuth';

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

app.use('/user', userRoute);
app.use('/card', isAuth, cardRoute);
app.use('/offer', offerRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
