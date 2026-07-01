"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = require("../../schema/user.schema");
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: "Token байхгүй байна" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        await user_schema_1.UserModel.findOneAndUpdate({ email: decoded.email }, { isVerified: true });
        const frontendBaseUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL;
        return res.redirect(`${frontendBaseUrl}/login?verified=true`);
    }
    catch (error) {
        console.error("Verification Error:", error.message);
        const frontendBaseUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL;
        return res.redirect(`${frontendBaseUrl}/verification-error`);
    }
};
exports.verifyEmail = verifyEmail;
