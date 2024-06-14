"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const messageRoutes = (0, express_1.Router)();
messageRoutes.get('/:chatId', authMiddleware_1.default, messageController_1.fetchMessages);
messageRoutes.post('/send', authMiddleware_1.default, messageController_1.sendMessage);
exports.default = messageRoutes;
