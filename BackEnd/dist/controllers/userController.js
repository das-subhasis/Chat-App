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
exports.removeUser = exports.registerUser = exports.authUser = exports.fetchUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const authUtils_1 = require("../utils/authUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.fetchUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.search ? {
            $or: [
                { username: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};
        const users = yield User_1.default.find(query).select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to fetch users.');
    }
}));
exports.authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const foundUser = yield User_1.default.findOne({ username });
        if (!foundUser || !(yield bcrypt_1.default.compare(password, foundUser.password))) {
            res.status(404);
            throw new Error("Invalid username or password");
        }
        res.status(200).json({
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            pic: foundUser.pic,
            token: (0, authUtils_1.generateToken)(foundUser._id)
        });
    }
    catch (error) {
        res.status(401);
        throw new Error(error);
    }
}));
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, pic } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if (existingUser) {
            res.status(409);
            throw new Error("User already exists.");
        }
        ;
        const newUser = yield User_1.default.create({
            username: username,
            email: email,
            password: password,
            pic: pic
        });
        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            pic: newUser.pic,
            token: (0, authUtils_1.generateToken)(newUser._id)
        });
    }
    catch (error) {
        throw new Error(error);
    }
}));
exports.removeUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    try {
        const user = yield User_1.default.findByIdAndDelete(id);
        res.status(200).send(`User - ${id} has been removed successfully.`);
    }
    catch (error) {
        res.status(400);
        throw new Error("Failed to remove user");
    }
}));
