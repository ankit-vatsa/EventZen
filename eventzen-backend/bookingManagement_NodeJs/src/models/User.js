import pool from '../config/db.js';

export default class User {
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        return rows.length ? rows[0].id : null;
    }
}
