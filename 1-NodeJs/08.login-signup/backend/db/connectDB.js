import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to DB`);
    } catch (error) {
        console.log(`Error while connecting to DB: ${error.message}`);
        exit(1);
    }
}

export default connectDB;