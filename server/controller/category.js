import * as categoryRepository from '../data/category.js';

export async function getCategories(req, res) {
  const data = await categoryRepository.getAll();
  res.status(200).json(data);
}

export async function getCategoryById(req, res) {
  const id = req.params.id;
  const data = await categoryRepository.getById(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Menu id(${id}) not found` });
  }
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

export async function deleteCategory(req, res, next) {
  const id = req.params.id;
  const category = await categoryRepository.remove(id);
  if (!category) {
    return res.status(404).json({ message: `category not found: ${id}` });
  }
  if (req.body.userKey !== '1234') {
    return res.sendStatus(403);
  }
  await categoryRepository.remove(id);
  res.sendStatus(204);
}
