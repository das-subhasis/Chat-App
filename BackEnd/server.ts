import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import CORS from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware";
import connectDB from "./utils/config";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import {Server, Socket} from "socket.io";

config();
connectDB();

const app = express();

// Middleware for handling CORS
app.use(CORS());

// Middleware to parse JSON responses
app.use(express.json());

// User Routes
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

// Middleware to handle routes that do not exist
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Default port

const server = app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
});

const io = new Server(server, {
    pingTimeout: 50000,
    cors:{
        origin:'http://localhost:5173'
    }
})

io.on("connection", (socket : Socket) => {
    console.log("Connected to socket.io");
    socket.on('join_chat', (chatId) => {
        socket.join(chatId);
    });

    socket.on('send_message', (message) => {
        io.to(message.chatId).emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


