import express from 'express';
import { createBooking ,getAllBookings} from '../controllers/booking.controller.js';
import  verifyJWT  from '../middlewares/auth.middleware.js';

// Booking routes

const router = express.Router();

router.use(verifyJWT);

router.post('/create',createBooking)
router.get('/getAllBookings',getAllBookings);

export default router;