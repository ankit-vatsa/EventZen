import express from 'express';
import { createBooking, getBookingsByEmail, deleteBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:email', getBookingsByEmail);
router.delete('/:id', deleteBooking);

export { router };
