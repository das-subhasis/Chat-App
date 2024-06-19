"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.fetchMessages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Message_1 = __importDefault(require("../models/Message"));
const Chat_1 = __importDefault(require("../models/Chat"));
exports.fetchMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield Message_1.default.find({ chat: req.params.chatId }).populate("sender", "username email pic").populate("chat");
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500);
        throw new Error("Failed to fetch messages.");
    }
}));
exports.sendMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, chat } = req.body;
    try {
        let newMessage = yield Message_1.default.create({
            sender: req.user._id,
            content,
            chat
        });
        newMessage = yield newMessage.populate("sender", "username email pic");
        newMessage = yield newMessage.populate('chat');
        newMessage = yield newMessage.populate("chat.users", "username email pic");
        res.status(200).json(newMessage);
        yield Chat_1.default.findByIdAndUpdate(chat, { latestMessage: newMessage });
    }
    catch (error) {
        res.status(401);
        throw new Error(`Failed to send message. ${error}`);
    }
}));
