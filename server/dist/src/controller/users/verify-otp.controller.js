"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const user_schema_1 = require("../../schema/user.schema");
const verifyOtp = async (req, res) => {
    try {
        const { email, verifyCode } = req.body;
        const user = await user_schema_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User oldsongui" });
        }
        if (!user.resetPasswordOtp || user.resetPasswordOtp !== verifyCode) {
            return res.status(400).json({ message: "Verify otp code buruu bn" });
        }
        if (new Date() > user.resetPasswordExpires) {
            return res.status(400).json({ message: "Code nii hugatsaa duussan" });
        }
        res.status(200).json({
            success: true,
            message: "Code amjilttai batalgaajlaa, odoo nuuts ugee shinchilne uu"
        });
    }
    catch (error) {
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.verifyOtp = verifyOtp;
