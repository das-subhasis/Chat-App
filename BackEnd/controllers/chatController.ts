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

        res.json(allChats);
    } catch (error: any) {
        res.status(401);
        throw new Error(error);
    }
})

export const createChat = expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400);
        throw new Error("User ID is required");
    }

    if (userId === String(req.user._id)) {
        res.status(400);
        throw new Error("You cannot create a chat with yourself");
    }

    try {
        const existingChat = await Chat.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        })

        if (existingChat) {
            res.status(401);
            throw new Error("Chat already exists");
        }

        const newChat = await Chat.create({
            users: [req.user._id, userId]
        })

        const fullChat = await Chat.findById(newChat._id).populate("users", "-password");

        res.status(200).json(fullChat);
    } catch (error: any) {
        res.status(401);
        throw new Error(error)
    }
})