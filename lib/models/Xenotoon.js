import pool from '../utils/pool';

export class Xenotoon {

  id;
  name;
  weapon;
  numberOfPersonalities;
  purposeDestroyWorld;

  constructor (row){
    this.id = row.id;
    this.name = row.name;
    this.weapon = row.weapon;
    this.numberOfPersonalities = row.numberOfPersonalities;
    this.purposeDestroyWorld = row.purposeDestroyWorld;
  }

  static async insert({ name, weapon, numberOfPersonalities, purposeDestroyWorld }) {
    const { rows } = await pool.query(`
    INSERT INTO xenotoons 
    (name, weapon, number_of_personalities, purpose_destroy_world)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, weapon, number_of_personalities as "numberOfPersonalities", purpose_destroy_world as "purposeDestroyWorld"
    `, [name, weapon, numberOfPersonalities, purposeDestroyWorld]
    );

    return new Xenotoon(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT id, name, weapon, number_of_personalities as "numberOfPersonalities", purpose_destroy_world as "purposeDestroyWorld"
    FROM xenotoons
    `);

    return rows.map(row => new Xenotoon(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT id, name, weapon, number_of_personalities as "numberOfPersonalities", purpose_destroy_world as "purposeDestroyWorld"
    FROM xenotoons
    WHERE id = $1
    `, [id]
    );

    return new Xenotoon(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM xenotoons
    WHERE id = $1
    RETURNING id, name, weapon, number_of_personalities as "numberOfPersonalities", purpose_destroy_world as "purposeDestroyWorld"
    `, [id]
    );

    return new Xenotoon(rows[0]);
  }

  static async update(id, { name, weapon, numberOfPersonalities, purposeDestroyWorld }) {
    const { rows } = await pool.query(`
    UPDATE xenotoons
    SET name = $2, weapon = $3, number_of_personalities = $4, purpose_destroy_world = $5
    WHERE id = $1
    RETURNING id, name, weapon, number_of_personalities as "numberOfPersonalities", purpose_destroy_world as "purposeDestroyWorld"
    `, [id, name, weapon, numberOfPersonalities, purposeDestroyWorld]
    );

    return new Xenotoon(rows[0]);

  }
}
