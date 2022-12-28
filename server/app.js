import express from 'express';
import cors from 'cors';
import categoryRouter from './router/category.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/category', categoryRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
