import pool from '../utils/pool';

export class Ta {
  id;
  name;
  harvestsStudentTears;
  numberOfStudentProjectsCompleted;
  gradingDifficulty;

  constructor (row) {
    this.id = row.id;
    this.name = row.name;
    this.harvestsStudentTears = row.harvestsStudentTears;
    this.numberOfStudentProjectsCompleted = row.numberOfStudentProjectsCompleted;
    this.gradingDifficulty = row.gradingDifficulty;
  }

  static async insert ({ name, harvestsStudentTears, numberOfStudentProjectsCompleted, gradingDifficulty }) {
    const { rows } = await pool.query(`
    INSERT INTO tas (name, harvests_student_tears, number_of_student_projects_completed, grading_difficulty)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, harvests_student_tears as "harvestsStudentTears", number_of_student_projects_completed as "numberOfStudentProjectsCompleted", grading_difficulty as "gradingDifficulty"
    `, [name, harvestsStudentTears, numberOfStudentProjectsCompleted, gradingDifficulty]
    );

    return new Ta(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT id, name, harvests_student_tears as "harvestsStudentTears", number_of_student_projects_completed as "numberOfStudentProjectsCompleted", grading_difficulty as "gradingDifficulty"
    FROM tas
    WHERE id = $1
     `, [id]
    );

    if (!rows[0]) return null;

    return new Ta(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT id, name, harvests_student_tears as "harvestsStudentTears", number_of_student_projects_completed as "numberOfStudentProjectsCompleted", grading_difficulty as "gradingDifficulty"
    FROM tas`
    );

    return rows.map(row => new Ta(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM tas
    WHERE id = $1
    RETURNING id, name, harvests_student_tears as "harvestsStudentTears", number_of_student_projects_completed as "numberOfStudentProjectsCompleted", grading_difficulty as "gradingDifficulty"
    `, [id]
    );

    return new Ta(rows[0]);
  }

  static async update({ id, name, harvestsStudentTears, numberOfStudentProjectsCompleted, gradingDifficulty }) {
    const { rows } = await pool.query(`
      UPDATE tas
      SET name = $2, harvests_student_tears = $3, number_of_student_projects_completed = $4, grading_difficulty = $5
      WHERE id = $1
      RETURNING id, name, harvests_student_tears as "harvestsStudentTears", number_of_student_projects_completed as "numberOfStudentProjectsCompleted", grading_difficulty as "gradingDifficulty"
    `, [id, name, harvestsStudentTears, numberOfStudentProjectsCompleted, gradingDifficulty]
    );

    return new Ta(rows[0]);
  }

}
