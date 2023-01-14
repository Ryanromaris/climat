import { db } from '../db/database.js';

//Get
export async function getAll() {
  return db
    .execute(
      'SELECT m.id, m.name, m.categoryname, m.type, m.summary, m.alcohol, m.amount, m.vintage FROM menu as m ORDER BY m.id'
    )
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(
      'SELECT m.id, m.name, m.categoryname, m.type, m.summary, m.alcohol, m.amount, m.vintage FROM menu as m WHERE m.id=?',
      [id]
    )
    .then((result) => result[0][0]);
}
