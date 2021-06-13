import pool from '../utils/pool';

export class Laptop {

  id;
  make;
  model;
  aspectRatio;
  upgradable;
  keyTravel;

  constructor (row) {

    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.aspectRatio = row.aspectRatio;
    this.upgradable = row.upgradable;
    this.keyTravel = row.keyTravel;
  }

  static async insert({ make, model, aspectRatio, upgradable, keyTravel }) {
    const { rows } = await pool.query(`
    INSERT INTO laptops (make, model, aspect_ratio, upgradable, key_travel)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, make, model, aspect_ratio as "aspectRatio", upgradable, key_travel as "keyTravel"
    `, [make, model, aspectRatio, upgradable, keyTravel]
    );

    return new Laptop(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT id, make, model, aspect_ratio as "aspectRatio", upgradable, key_travel as "keyTravel"
    FROM laptops
    WHERE id = $1
    `, [id]
    );

    if (!rows[0]) return null;

    return new Laptop(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT id, make, model, aspect_ratio as "aspectRatio", upgradable, key_travel as "keyTravel"
    FROM laptops 
    `);

    return rows.map(row => new Laptop(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM laptops
    WHERE id = $1
    RETURNING id, make, model, aspect_ratio as "aspectRatio", upgradable, key_travel as "keyTravel"
    `, [id]
    );

    return new Laptop(rows[0]);

  }

  static async update({ id, make, model, aspectRatio, upgradable, keyTravel }) {

    const { rows } = await pool.query(`
      UPDATE laptops
      SET make = $2, model = $3, aspect_ratio = $4, upgradable = $5, key_travel = $6
      WHERE id = $1
      RETURNING id, make, model, aspect_ratio as "aspectRatio", upgradable, key_travel as "keyTravel"
      `, [id, make, model, aspectRatio, upgradable, keyTravel]
    );

    return new Laptop(rows[0]);

  }

}
