import pool from '../config/db.js';

export const getAllBookingsWithDetails = async () => {
    const [rows] = await pool.query(`
             SELECT 
         b.id AS booking_id,
         u.name AS attendee_name, 
         u.email AS attendee_email,
         e.name AS event_name,  -- Change 'e.event_name' to 'e.name' based on actual column name
         e.date AS event_date,
         v.name AS venue_name,  -- Change 'v.venue_name' if needed
         v.location AS venue_location,
         b.status
     FROM bookings b
     JOIN users u ON b.user_id = u.id
     JOIN events e ON b.event_id = e.id
     JOIN venues v ON b.venue_id = v.id;

    `);
    return rows;
};
export const getAllAttendeesWithDetails = async () => {
    const [rows] = await pool.query(`
        SELECT 
            a.id AS attendee_id,
            u.name AS attendee_name, 
            u.email AS attendee_email,
            e.name AS event_name,
            e.date AS event_date,
            v.name AS venue_name,
            v.location AS venue_location,
            a.status AS attendee_status
        FROM attendees a
        JOIN users u ON a.user_id = u.id
        JOIN events e ON a.event_id = e.id
        JOIN venues v ON e.venue_id = v.id
    `);
    return rows;
};

export const approveBooking = async (bookingId) => {
    // Update booking status to 'confirmed' instead of 'approved'
    await pool.query(`UPDATE bookings SET status = 'confirmed' WHERE id = ?`, [bookingId]);
    
    // Insert into attendees table with 'confirmed' status
    await pool.query(`
        INSERT INTO attendees (user_id, event_id, status)
        SELECT user_id, event_id, 'confirmed' FROM bookings WHERE id = ?
    `, [bookingId]);
};


export const deleteAttendee = async (userId, eventId) => {
    // Check if attendee exists before deletion
    const [attendee] = await pool.query(
        `SELECT * FROM attendees WHERE user_id = ? AND event_id = ?`, 
        [userId, eventId]
    );

    if (attendee.length > 0) {
        // Delete attendee from attendees table
        await pool.query(`DELETE FROM attendees WHERE user_id = ? AND event_id = ?`, [userId, eventId]);

        // ✅ Use the correct ENUM value for status update
        await pool.query(`UPDATE bookings SET status = 'cancelled' WHERE user_id = ? AND event_id = ?`, [userId, eventId]);
    }
};



export const getAttendeesByEvent = async (eventId) => {
    const [rows] = await pool.query(`
  SELECT 
    u.name AS attendee_name, 
    u.email AS attendee_email,
    e.name AS event_name,  -- Corrected here to use e.name instead of e.event_name
    e.date AS event_date,
    v.name AS venue_name,  -- Corrected here to use v.name instead of v.venue_name
    v.location AS venue_location
FROM attendees a
JOIN users u ON a.user_id = u.id
JOIN events e ON a.event_id = e.id
JOIN venues v ON e.venue_id = v.id
WHERE a.event_id = ?

    `, [eventId]);
    return rows;
};

export const getUserRegisteredEvents = async (userId) => {
    const [rows] = await pool.query(`
        SELECT 
            e.name AS event_name,  
            e.date AS event_date,
            v.name as venue_name,
            v.location AS venue_location
        FROM attendees a
        JOIN events e ON a.event_id = e.id  
        JOIN venues v ON e.venue_id = v.id
        WHERE a.user_id = ?
    `, [userId]);
    return rows;
};

export const approveAllBookings = async () => {
    // Update only pending bookings to 'confirmed'
    await pool.query(`UPDATE bookings SET status = 'confirmed' WHERE status = 'pending'`);
    
    // Insert only newly confirmed attendees into the attendees table
    await pool.query(`
        INSERT INTO attendees (user_id, event_id, status)
        SELECT user_id, event_id, 'confirmed' FROM bookings 
        WHERE status = 'confirmed'
        ON DUPLICATE KEY UPDATE status = 'confirmed'
    `);
};

export const rejectAllBookings = async () => {
    // Update only pending bookings to 'cancelled'
    await pool.query(`UPDATE bookings SET status = 'cancelled' WHERE status = 'pending'`);
};

