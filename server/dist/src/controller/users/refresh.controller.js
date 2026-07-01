"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = require("../../schema/user.schema");
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token bhq bn" });
        }
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const decoded = jsonwebtoken_1.default.verify(refreshToken, secret);
        const user = await user_schema_1.UserModel.findById(decoded.userId || decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User oldsongui" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET || "access_secret_123", { expiresIn: "15m" });
        res.status(200).json({ accessToken });
    }
    catch (error) {
        console.error("JWT Verify Error:", error.message);
        res.status(403).json({
            message: "Refresh token huchingui bn",
            error: error.message
        });
    }
};
exports.refresh = refresh;
