import * as menuRepository from '../data/menu.js';

export async function getMenus(req, res) {
  const data = await menuRepository.getAll();
  res.status(200).json(data);
}

export async function getMenuById(req, res) {
  const id = req.params.id;
  const data = await menuRepository.getById(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Menu id(${id}) not found` });
  }
}
