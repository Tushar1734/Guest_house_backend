import express from "express";
import { getRoomFacilities,getRoomTypes ,getAvailableRooms} from "../controllers/room.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import validateRole from "../middlewares/adminAuth.middleware.js";

const router = express.Router();

// Endpoint to get room facilities
router.get("/facilities", getRoomFacilities);
router.get('/types',getRoomTypes);
router.post('/available',getAvailableRooms);

export default router;
