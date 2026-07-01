"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../../schema/user.schema");
const resetPassword = async (req, res) => {
    try {
        const { email, verifyCode, newPassword } = req.body;
        console.log("DEBUG Body:", { email, verifyCode });
        const user = await user_schema_1.UserModel.findOne({
            email,
            resetPasswordOtp: verifyCode,
            resetPasswordExpires: { $gt: new Date() }
        });
        if (!user) {
            return res.status(400).json({ message: "Линк хүчингүй эсвэл хугацаа нь дууссан байна" });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        user.password = await bcrypt_1.default.hash(String(newPassword), salt);
        user.set('resetPasswordOtp', undefined);
        user.set('resetPasswordExpires', undefined);
        await user.save();
        res.status(200).json({ message: "Нууц үг амжилттай шинэчлэгдлээ" });
    }
    catch (error) {
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.resetPassword = resetPassword;
