import { Router } from "express"
import { authUser, registerUser } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get('/login', authUser);
userRoutes.get('/signup', registerUser);

export default userRoutes