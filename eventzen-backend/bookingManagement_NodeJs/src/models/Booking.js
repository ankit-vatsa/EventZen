import pool from '../config/db.js';

export default class Booking {
    static async create(userId, eventId, venueId) {
        const [result] = await pool.query(
            'INSERT INTO bookings (user_id, event_id, venue_id, status) VALUES (?, ?, ?, ?)',
            [userId, eventId, venueId, 'pending']
        );
        return result.insertId;
    }

    static async findByUserId(userId) {
        const [rows] = await pool.query(
            `SELECT b.id, e.name AS event_name, e.date AS event_date, v.name AS venue_name, b.status 
            FROM bookings b
            JOIN events e ON b.event_id = e.id
            JOIN venues v ON b.venue_id = v.id
            WHERE b.user_id = ?`,
            [userId]
        );
        return rows;
    }

    static async delete(bookingId) {
        const [result] = await pool.query('DELETE FROM bookings WHERE id = ?', [bookingId]);
        return result.affectedRows > 0;
    }
}
