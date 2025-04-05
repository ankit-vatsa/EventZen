import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Importing CORS
import { router as bookingRoutes } from './routes/bookingRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());  // This will allow all origins, you can configure it more if needed

app.use(express.json());

// Booking routes
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 6007;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from 'express';
// import dotenv from 'dotenv';
// import { router as bookingRoutes } from './routes/bookingRoutes.js';
// import errorHandler from './middlewares/errorMiddleware.js';

// dotenv.config();
// const app = express();

// app.use(express.json());

// app.use('/api/bookings', bookingRoutes);

// app.use(errorHandler);

// const PORT = process.env.PORT || 6007;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
