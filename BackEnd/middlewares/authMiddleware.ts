import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { authToken } from "../utils/authUtils";
import User from "../models/User";
import { JwtPayload } from "jsonwebtoken";

const authenticate = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer ")) {
        try {
            const token = authorization.split(" ")[1];

            if (!token) {
                res.status(401);
                throw new Error("Unauthorized access. Invalid token.");
            }

            const decoded: JwtPayload = authToken(token);

            req.user = await User.findById(decoded._id).select("-password");
            if (!req.user) {
                res.status(401);
                throw new Error("Unauthorized access. User not found.");
            }

            next();
        } catch (error: any) {
            res.status(401);
            next(error);
        }
    } else {
        res.status(401);
        next(new Error("Unauthorized access. No token provided."));
    }
});

export default authenticate;
