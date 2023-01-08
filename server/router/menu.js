import express from 'express';

const router = express.Router();

const menus = [
  {
    id: 1,
    name: '까베르네 쇼비뇽',
    category: '미국',
    type: 'red',
    summary: '풍미가 깊고 아주 맛있습니다. 쏘쏘쏘쏘쏘 굿',
  },
  {
    id: 2,
    name: '멜롯',
    category: '프랑스',
    type: 'red',
    summary: '풍미가 쏘굿쏘굿 아주 맛있습니다. 쏘쏘쏘쏘쏘 굿',
  },
  {
    id: 3,
    name: '리슬링',
    category: '프랑스',
    type: 'white',
    summary: '풍미가 쏘굿쏘굿 아주 맛있습니다. 쏘쏘쏘쏘쏘 굿',
  },
];

router.get('/', (req, res, next) => {
  res.status(200).json(menus);
});

//Get by menu id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const menu = menus.find((m) => m.id === Number(id));
  if (menu) {
    res.status(200).json(menu);
  } else {
    res.status(404).json({ message: `Menu ${id} not found` });
  }
});

//post

//Delete

export default router;
