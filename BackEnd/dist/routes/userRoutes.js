"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userRoutes = (0, express_1.Router)();
userRoutes.get('/login', userController_1.authUser);
userRoutes.post('/signup', userController_1.registerUser);
userRoutes.post('/remove/:userId', authMiddleware_1.default, userController_1.removeUser);
exports.default = userRoutes;
