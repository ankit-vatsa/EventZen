import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Venue from '../models/Venue.js';

// Create Booking
export const createBooking = async (req, res) => {
    try {
        const { email, eventName, venueName } = req.body;

        const userId = await User.findByEmail(email);
        const eventId = await Event.findByName(eventName);
        const venueId = await Venue.findByName(venueName);

        if (!userId || !eventId || !venueId) {
            return res.status(400).json({ message: "Invalid user, event, or venue." });
        }

        const bookingId = await Booking.create(userId, eventId, venueId);
        res.status(201).json({ message: "Booking created successfully!", bookingId });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Bookings by User Email
export const getBookingsByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const userId = await User.findByEmail(email);
        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookings = await Booking.findByUserId(userId);
        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Booking
export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const success = await Booking.delete(id);
        if (!success) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
