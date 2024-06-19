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
exports.createChat = exports.fetchChats = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Chat_1 = __importDefault(require("../models/Chat"));
exports.fetchChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allChats = yield Chat_1.default.find({
            users: {
                $elemMatch: { $eq: req.user._id }
            }
        }).populate("users", "-password").populate("latestMessage");
        res.json(allChats);
    }
    catch (error) {
        res.status(401);
        throw new Error(error);
    }
}));
exports.createChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingChat = yield Chat_1.default.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        });
        if (existingChat) {
            res.status(401);
            throw new Error("Chat already exists");
        }
        const newChat = yield Chat_1.default.create({
            users: [req.user._id, userId]
        });
        const fullChat = yield Chat_1.default.findById(newChat._id).populate("users", "-password");
        res.status(200).json(fullChat);
    }
    catch (error) {
        res.status(401);
        throw new Error(error);
    }
}));
