import pool from '../config/db.js';

export default class Venue {
    static async findByName(name) {
        const [rows] = await pool.query('SELECT id FROM venues WHERE name = ?', [name]);
        return rows.length ? rows[0].id : null;
    }
}
