import {
    getAllBookingsWithDetails,
    getAllAttendeesWithDetails,
    approveBooking,
    deleteAttendee,
    getAttendeesByEvent,
    getUserRegisteredEvents,
    approveAllBookings,
    rejectAllBookings
} from '../models/attendeeModel.js';

export const fetchAllBookings = async (req, res) => {
    try {
        const bookings = await getAllBookingsWithDetails();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
export const fetchAllAttendees = async (req, res) => {
    try {
        const attendees = await getAllAttendeesWithDetails();
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendees', error });
    }
};
export const approveBookingHandler = async (req, res) => {
    const { bookingId } = req.params;
    try {
        await approveBooking(bookingId);
        res.status(200).json({ message: 'Booking approved' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving booking', error });
    }
};

export const deleteAttendeeHandler = async (req, res) => {
    const { userId, eventId } = req.params;
    try {
        await deleteAttendee(userId, eventId);
        res.status(200).json({ message: 'Attendee removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing attendee', error });
    }
};

export const getAttendeesForEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const attendees = await getAttendeesByEvent(eventId);
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendees', error });
    }
};

export const getUserEvents = async (req, res) => {
    const { userId } = req.params;
    try {
        const events = await getUserRegisteredEvents(userId);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user events', error });
    }
};

export const approveAllHandler = async (req, res) => {
    try {
        await approveAllBookings();
        res.status(200).json({ message: 'All bookings approved' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving all bookings', error });
    }
};

export const rejectAllHandler = async (req, res) => {
    try {
        await rejectAllBookings();
        res.status(200).json({ message: 'All bookings rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting all bookings', error });
    }
};
