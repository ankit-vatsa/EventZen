import pool from '../config/db.js';

export default class Event {
    static async findByName(name) {
        const [rows] = await pool.query('SELECT id FROM events WHERE name = ?', [name]);
        return rows.length ? rows[0].id : null;
    }
}
