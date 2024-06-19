"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const config_1 = __importDefault(require("./utils/config"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const socket_io_1 = require("socket.io");
(0, dotenv_1.config)();
(0, config_1.default)();
const app = (0, express_1.default)();
// Middleware for handling CORS
app.use((0, cors_1.default)());
// Middleware to parse JSON responses
app.use(express_1.default.json());
// User Routes
app.use('/user', userRoutes_1.default);
app.use('/chat', chatRoutes_1.default);
app.use('/message', messageRoutes_1.default);
// Middleware to handle routes that do not exist
app.use(errorMiddleware_1.notFoundHandler);
// Error handling middleware
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000; // Default port
const server = app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
});
const io = new socket_io_1.Server(server, {
    pingTimeout: 50000,
    cors: {
        origin: 'http://localhost:5173'
    }
});
io.on("connection", (socket) => {
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
});
