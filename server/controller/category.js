import * as categoryRepository from '../data/category.js';

export async function getCategories(req, res) {
  const data = await categoryRepository.getAll();
  res.status(200).json(data);
}

export async function createCategory(req, res, next) {
  const { name } = req.body;
  const data = await categoryRepository.create(name);

  if (data.code === 'ER_DUP_ENTRY') {
    res
      .status(400)
      .json({ message: `'${name}' 카테고리명이 이미 존재합니다. ` });
  } else {
    res.status(201).json(data);
  }
}
