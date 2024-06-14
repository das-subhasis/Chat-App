import expressAsyncHandler from "express-async-handler";
import Message from "../models/Message";
import { Request, Response } from "express";

export const fetchMessages = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "username email pic").populate("chat");
        res.status(200).json({
            messages: messages
        });
    } catch (error) {
        res.status(500);
        throw new Error("Failed to fetch messages.")
    }
})

export const sendMessage = expressAsyncHandler(async (req: Request, res: Response) => {
    const { content, chat } = req.body;

    try {
        let newMessage = await Message.create({
            sender: req.user._id,
            content,
            chat
        });

        newMessage = await newMessage.populate("sender", "username email pic");
        newMessage = await newMessage.populate("chat");

        res.status(200).json({
            message: newMessage
        });

    } catch (error: any) {
        res.status(401);
        throw new Error(`Failed to send message. ${error}`);
    }
})

