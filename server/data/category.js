import { db } from '../db/database.js';

//Get
export async function getAll() {
  return db
    .execute('SELECT c.id, c.name FROM category as c ORDER BY c.id')
    .then((result) => result[0]);
}

export async function create(name) {
  return db
    .execute('INSERT INTO category (name) VALUES(?)', [name])
    .then(() => getAll())
    .catch((e) => e);
}
