import { config } from "dotenv";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import mongoose from "mongoose";

config();

export const generateToken = (_id: mongoose.Types.ObjectId): string => {
    return sign({ _id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });
}

export const authToken = (token: string): JwtPayload => {
    try {
        return verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}
