"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInController = void 0;
const user_schema_1 = require("../../../schema/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_schema_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User oldsongui" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Nuuts ug buruu bna" });
        }
        console.log(user.role);
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({
            message: "Success",
            accessToken,
            refreshToken,
            user: { id: user._id, email: user.email, role: user.role }
        });
    }
    catch (error) {
        console.error("SignIn Error:", error);
        return res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.signInController = signInController;
