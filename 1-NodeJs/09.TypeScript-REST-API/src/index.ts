import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import compression from "compression";
import cors from 'cors';
import router from './router';


const app = express();
const PORT: number = 8080 || 4000;

// --- Middlewares ---
app.use(cors({ credentials: true, }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// --- Init Server ---
const server = http.createServer(app);

// --- Listenening ---
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/", router());

// --- MongoDB Connection ---
const MONGO_URL: string = 'mongodb+srv://kernel:feSv9FJQ8HkDfMHF@cluster0.zm7h3qe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', () => { console.log('Connected to MongoDB'); });
mongoose.connection.on('error', (err) => { console.error('Failed to connect to MongoDB', err); });

