import { Router } from "express";
import { fetchChats } from "../controllers/chatController";
import authenticate from "../middlewares/authMiddleware";

const chatRoutes = Router();

chatRoutes.get('/', authenticate, fetchChats);

export default chatRoutes