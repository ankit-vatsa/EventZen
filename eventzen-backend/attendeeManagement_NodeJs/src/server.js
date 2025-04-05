import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Importing CORS
import attendeeRoutes from './routes/attendeeRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 
// Routes
app.use('/api/attendees', attendeeRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Attendee Management Module is running...');
});

// Start server
const PORT = process.env.PORT || 6008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
