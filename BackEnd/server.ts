import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import CORS from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware";

config();

const app = express();

// Middleware for handling CORS
app.use(CORS());

// Middleware to parse JSON responses
app.use(express.json());

// User Routes
app.use('/user', userRoutes);

// Middleware to handle routes that do not exist
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Default port

app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
});
