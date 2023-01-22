import express from 'express';
import * as menuController from '../controller/menu.js';

const router = express.Router();

router.get('/', menuController.getMenus);

router.get('/:id', menuController.getMenuById);

router.post('/', menuController.createMenu);

router.delete('/:id', menuController.deleteMenu);

export default router;
