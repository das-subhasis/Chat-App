import { Router } from "express"
import { authUser, registerUser, removeUser } from "../controllers/userController";
import authenticate from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.get('/login', authUser);
userRoutes.post('/signup', registerUser);
userRoutes.post('/remove/:userId', authenticate, removeUser)
export default userRoutes