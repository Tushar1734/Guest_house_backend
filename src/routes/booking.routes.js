import express from 'express';
import { createBooking } from '../controllers/booking.controller.js';
import  verifyJWT  from '../middlewares/auth.middleware.js';

// Booking routes

const router = express.Router();

router.use(verifyJWT);

router.post('/create',createBooking)


export default router;