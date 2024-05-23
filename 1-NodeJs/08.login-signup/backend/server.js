import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


// file imports
import connectDB from './db/connectDB.js';
import authRoutes from './routes/auth.routes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

