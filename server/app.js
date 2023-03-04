import express from 'express';
import cors from 'cors';
import categoryRouter from './router/category.js';
import menuRouter from './router/menu.js';
import { db } from './db/database.js';
import { config } from './config.js';
// import { initSocket } from './connection/socket.js';

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(cors(corsOption));

app.use('/category', categoryRouter);
app.use('/menu', menuRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection().then((connection) => console.log(connection));
app.listen(8080);
// const server =

// initSocket(server);
