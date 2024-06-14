"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.generateToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
const generateToken = (_id) => {
    return (0, jsonwebtoken_1.sign)({ _id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};
exports.generateToken = generateToken;
const authToken = (token) => {
    try {
        return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
};
exports.authToken = authToken;
