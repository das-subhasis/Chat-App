import { Router } from "express";
import { fetchMessages, sendMessage } from "../controllers/messageController";
import authenticate from "../middlewares/authMiddleware";

const messageRoutes = Router();

messageRoutes.get('/:chatId', authenticate,fetchMessages);
messageRoutes.post('/send', authenticate, sendMessage);

export default messageRoutes