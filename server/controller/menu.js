import * as menuRepository from '../data/menu.js';

export async function getMenus(req, res) {
  const data = await menuRepository.getAll();
  res.status(200).json(data);
}

export async function getMenuById(req, res) {
  const id = req.params.id;
  const data = await menuRepository.getById(id);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ message: `Menu id(${id}) not found` });
  }
}

export async function createMenu(req, res, next) {
  const { name, categoryname, type, summary, alcohol, amount, vintage } =
    req.body;

  const data = await menuRepository.create(
    name,
    categoryname,
    type,
    summary,
    alcohol,
    amount,
    vintage
  );

  res.status(201).json(data);
}

export async function deleteMenu(req, res, next) {
  const id = req.params.id;
  const menu = await menuRepository.remove(id);
  if (!menu) {
    return res.status(404).json({ message: `menu not found: ${id}` });
  }
  if (req.body.userKey !== '1234') {
    return res.sendStatus(403);
  }
  await menuRepository.remove(id);
  res.sendStatus(204);
}
