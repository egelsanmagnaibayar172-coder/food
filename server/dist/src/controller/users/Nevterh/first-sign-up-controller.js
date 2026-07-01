"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstSignUp = void 0;
const user_schema_1 = require("../../../schema/user.schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_utils_1 = require("../../../utils/mail-utils");
const firstSignUp = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await user_schema_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email burtgegdsen bn" });
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || "hello", { expiresIn: "15m" });
        const frontendUrl = "http://localhost:3000";
        const baseUrl = process.env.BACKEND_API || "http://localhost:8000";
        // const publicUrl= frontendUrl || baseUrl
        // const verificationLink = `${publicUrl}/verify-email?token=${token}`;
        const publicUrl = frontendUrl || baseUrl;
        // const verificationLink = `${publicUrl}/verify-email?token=${token}`
        const verificationLink = `${frontendUrl}/sign-up?token=${token}`;
        await (0, mail_utils_1.verifyUserEmail)(email, verificationLink);
        res.status(200).json({
            message: "Batalgaajuulah mail yvuulsan. Mail ee shalgaad nuuts ugee tohiruulna uu", token
        });
    }
    catch (error) {
        res.status(500).json({ message: "Aldaa garlaa", error: error.message });
    }
};
exports.firstSignUp = firstSignUp;
