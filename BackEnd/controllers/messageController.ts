import expressAsyncHandler from "express-async-handler";
import Message from "../models/Message";
import { Request, Response } from "express";
import User from "../models/User";
import Chat from "../models/Chat";

export const fetchMessages = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "username email pic").populate("chat");
        res.status(200).json(messages);
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
        newMessage = await newMessage.populate('chat');
        newMessage = await newMessage.populate("chat.users", "username email pic");

        res.status(200).json(newMessage);

        await Chat.findByIdAndUpdate(chat, { latestMessage: newMessage });

    } catch (error: any) {
        res.status(401);
        throw new Error(`Failed to send message. ${error}`);
    }
})

