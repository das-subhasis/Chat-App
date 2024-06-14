import { config } from "dotenv";
import mongoose, { Mongoose, mongo } from "mongoose";
config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string, {
            connectTimeoutMS: 5000, // closes the connection if not connected under 5s.
        });
        // console.log(`${conn.connection.host}`)
        console.log(`Connected to MongoDB: ${conn.connection.host}`)
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        process.exit(1); // exits with non-zero status code to indicate an error.
    }
}

export default connectDB