"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const chatRoutes = (0, express_1.Router)();
chatRoutes.get('/', authMiddleware_1.default, chatController_1.fetchChats);
exports.default = chatRoutes;
