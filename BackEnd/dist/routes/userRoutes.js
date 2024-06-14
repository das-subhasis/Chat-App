"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/login', userController_1.authUser);
userRoutes.post('/signup', userController_1.registerUser);
exports.default = userRoutes;
