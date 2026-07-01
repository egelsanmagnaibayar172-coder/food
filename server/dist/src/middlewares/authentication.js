"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Login hiih erhgui bn" });
    }
    const token = authHeader.split(" ")[1];
    console.log("Headers:", req.headers.authorization);
    try {
        const secret = process.env.JWT_SECRET;
        console.log("Backend-ийн ашиглаж буй Secret:", secret);
        if (!secret)
            throw new Error("JWT_SECRET is not defined!");
        console.log("Token:", token);
        console.log("Backend-ийн ашиглаж буй Secret:", secret);
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Token huchingui esvel hugatsaa duussan",
            error: error.message
        });
    }
};
exports.authentication = authentication;
