import { Router } from "express"
import { authUser, fetchUsers, registerUser, removeUser } from "../controllers/userController";
import authenticate from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.get('/', authenticate, fetchUsers)
userRoutes.post('/login', authUser);
userRoutes.post('/signup', registerUser);
userRoutes.post('/remove/:userId', authenticate, removeUser)
export default userRoutes