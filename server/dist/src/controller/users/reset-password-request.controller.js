"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordRequest = void 0;
const crypto_1 = __importDefault(require("crypto"));
const models_1 = require("../../models");
const reset_password_1 = require("../../utils/reset-password");
const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await models_1.UserModel.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User oldsongui" });
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        const resetLink = `${process.env.VERCEL_URL}/reset-password?token=${resetToken}&email=${email}`;
        const result = await (0, reset_password_1.ResetPasswordVerificationEmail)(email, resetLink);
        if (result.success) {
            user.resetPasswordOtp = resetToken;
            user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
            await user.save();
            return res.status(200).json({ message: "Reset линк и-мэйл рүү илгээгдлээ" });
        }
        return res.status(500).json({ message: "Алдаа гарлаа" });
    }
    catch (error) {
        return res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.resetPasswordRequest = resetPasswordRequest;
