import express from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import validateRole from '../middlewares/adminAuth.middleware.js';
import { createRoom } from '../controllers/room.controller.js';


const router = express.Router();

console.log("Admin routes loaded");

router.get('/test', (req, res) => {
  console.log('[admin.routes] /test hit');
  res.json({ message: 'Admin router is loaded!' });
});

router.post('/rooms/create', verifyJWT, validateRole('admin'), createRoom);




export default router;

