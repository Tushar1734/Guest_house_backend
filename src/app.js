import express from'express'
import roomRoutes from './routes/room.routes.js';
import userRoutes from './routes/user.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin.routes.js';
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
// Room routes
app.use("/api/rooms", roomRoutes);
// User routes
app.use("/api/users", userRoutes)
// Booking routes
app.use("/api/bookings", bookingRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

export default app;