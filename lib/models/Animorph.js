import pool from '../utils/pool';

export class Animorph {
  id;
  name;
  morph;
  minutes;
  isMorphed;

  constructor (row) {
    this.id = row.id;
    this.name = row.name;
    this.morph = row.morph;
    this.minutes = row.minutes;
    this.isMorphed = row.isMorphed;
  }

  static async insert({ name, morph, minutes, isMorphed }) {
    const { rows } = await pool.query(`
      INSERT INTO animorph (name, morph, minutes, is_morphed) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id, name, morph, minutes, is_morphed as "isMorphed";
      `, [name, morph, minutes, isMorphed]
    );

    return new Animorph(rows[0]);
  }

  static async findByid(id) {
    const { rows } = await pool.query(
      'SELECT id, name, morph, minutes, is_morphed as "isMorphed" FROM animorph WHERE id = $1',
      [id]
    );

    if (!rows[0]) return null;

    return new Animorph(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT id, name, morph, minutes, is_morphed as "isMorphed" FROM animorph',
    );

    return rows.map(row => new Animorph(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM animorph WHERE id = $1 RETURNING id, name, morph, minutes, is_morphed as "isMorphed"',
      [id]
    );

    return new Animorph(rows[0]);
  }
}

