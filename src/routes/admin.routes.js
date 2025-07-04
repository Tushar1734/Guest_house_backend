import express from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import validateRole from '../middlewares/adminAuth.middleware.js';
import { createRoom, deleteRoom, updateRoom } from '../controllers/room.controller.js';
import { createStaff, getAllStaffUsers } from '../controllers/user.controller.js';
import { createWalkinBooking, getBookingHistory } from '../controllers/booking.controller.js';


const router = express.Router();

// console.log("Admin routes loaded");

router.use(verifyJWT, validateRole('admin'))
router.get('/test', (req, res) => {
  console.log('[admin.routes] /test hit');
  res.json({ message: 'Admin router is loaded!' });
});
router.post('/rooms/create', createRoom);
router.put('/rooms/update/:id',updateRoom);
router.delete('/rooms/delete/:id',deleteRoom);
router.get('/users/list',getAllStaffUsers);
router.post('/users/create-staff',createStaff);
router.get('/customer/history',getBookingHistory);
router.post('/bookings/create-walkin',createWalkinBooking)




export default router;

