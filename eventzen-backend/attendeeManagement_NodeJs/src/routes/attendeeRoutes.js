import express from 'express';
import {
    fetchAllBookings,
    fetchAllAttendees,
    approveBookingHandler,
    deleteAttendeeHandler,
    getAttendeesForEvent,
    getUserEvents,
    approveAllHandler,
    rejectAllHandler
} from '../controllers/attendeeController.js';

const router = express.Router();

router.get('/bookings', fetchAllBookings);
// Routes for attendees
router.get('/attendees', fetchAllAttendees); // New route for fetching all attendees
router.put('/approve/:bookingId', approveBookingHandler);
router.delete('/remove/:userId/:eventId', deleteAttendeeHandler);
router.get('/event/:eventId', getAttendeesForEvent);
router.get('/user/:userId', getUserEvents);
router.put('/approve-all', approveAllHandler);
router.put('/reject-all', rejectAllHandler);

export default router;
