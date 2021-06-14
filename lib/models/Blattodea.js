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

    const { rows } = await pool.query(`
      INSERT INTO blattodea 
      (name, habitat, length) 
      VALUES ($1, $2, $3) 
      RETURNING *`
    , [name, habitat, length] 
    );

    return new Blattodea(rows[0]);
  }

  static async findById(id) {

    const { rows } = await pool.query(
      `SELECT * 
      FROM blattodea
      WHERE id = $1`,
      [id]
    );

    if(!rows[0]) return null;
    return new Blattodea(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`
      SELECT * 
      FROM blattodea`,
    );

    return rows.map(row => new Blattodea(row));
  }

  static async delete(id) {

    const { rows } = await pool.query(`
      DELETE FROM blattodea 
      WHERE id = $1 
      RETURNING *`
    , [id]
    );

    return new Blattodea(rows[0]);
  }

  static async update(id, { name, habitat, length }) { 
    const { rows } = await pool.query(`
      UPDATE blattodea 
      SET name = $1, habitat = $2, length = $3
      WHERE id = $4 
      RETURNING *`
    , [name, habitat, length, id]
    );

    return new Blattodea(rows[0]);
  }

}
