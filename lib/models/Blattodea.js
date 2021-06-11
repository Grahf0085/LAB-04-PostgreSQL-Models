import pool from '../utils/pool';

export class Blattodea {
  id;
  name;
  habitat;
  length;

  constructor (row) {
    this.id = row.id;
    this.name = row.name;
    this.habitat = row.habitat;
    this.length = row.length;
  } 

  static async insert({ name, habitat, length }) {
    const { rows } = await pool.query(
      'INSERT INTO blattodea (name, habitat, length) VALUES ($1, $2, $3) RETURNING *',
      [name, habitat, length] 
    );

    return new Blattodea(rows[0]);
  }

}
