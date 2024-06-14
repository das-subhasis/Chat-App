import { Router } from "express";
import { createChat, fetchChats } from "../controllers/chatController";
import authenticate from "../middlewares/authMiddleware";

const chatRoutes = Router();

chatRoutes.get('/', authenticate, fetchChats);
chatRoutes.post('/create', authenticate, createChat)

export default chatRoutes