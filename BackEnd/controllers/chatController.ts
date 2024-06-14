import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Chat from "../models/Chat";

export const fetchChats = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const allChats = await Chat.find({
            users: {
                $elemMatch: { $eq: req.user._id }
            }
        }).populate("users", "-password").populate("latestMessage");

        res.json({
            chats: allChats
        })
    } catch (error: any) {
        res.status(401);
        throw new Error(error);
    }
})