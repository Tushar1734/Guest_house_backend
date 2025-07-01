import express from 'express';
import {handleLogin, handleLogout, handleSignup} from '../controllers/user.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js';

const router =express.Router();

// Endpoint to handle user signup
router.post('/signup',handleSignup);
router.post('/login',handleLogin);
router.post('/logout',verifyJWT,handleLogout)
// Export the router
export default router;