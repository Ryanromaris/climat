import express from 'express';

const router = express.Router();

const categories = ['미국', '프랑스', '칠레'];

const menu =
  //Get
  router.get('/', (req, res, next) => {
    res.status(200).json(categories);
  });
//post

//Delete

export default router;
