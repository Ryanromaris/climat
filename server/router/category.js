import express from 'express';
import * as categoryController from '../controller/category.js';

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/', categoryController.createCategory);

router.delete('/:id', categoryController.deleteCategory);

export default router;
