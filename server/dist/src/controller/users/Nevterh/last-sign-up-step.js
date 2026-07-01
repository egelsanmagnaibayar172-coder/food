"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastSignUp = void 0;
const user_schema_1 = require("../../../schema/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lastSignUp = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ message: "Medeelel dutuu bn" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "hello");
        const email = decoded.email;
        const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || "hello";
        // const decoded = jwt.verify(token, secret) as { email: string };
        // const email = decoded.email;
        const existingUser = await user_schema_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email ali hediin burtgegdsen bn" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await user_schema_1.UserModel.create({
            email,
            password: hashedPassword,
            isVerified: true,
            role: "USER"
        });
        res.status(201).json({
            message: "Burtgel amjilttai duuslaa. Odoo nerterne uu",
            userId: newUser._id
        });
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Linkiin hugatsaa duussan" });
        }
        res.status(500).json({ message: "Aldaa garlaa", error: error.message });
    }
};
exports.lastSignUp = lastSignUp;
