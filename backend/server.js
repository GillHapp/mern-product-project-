// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/product.route.js';
import cors from 'cors';


dotenv.config(); // Always at the top

const app = express();

// ✅ Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, // Optional: if you need to send cookies or auth headers
}));

app.use(express.json()); // Middleware to parse JSON data into req.body
app.use("/", router);

const PORT = process.env.PORT || 3000;

console.log('PORT:', PORT); // Should log 4000 from .env
console.log('MONGO_URI:', process.env.MONGO_URI); // Should log the Mongo URI

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
