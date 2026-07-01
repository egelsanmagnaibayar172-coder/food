"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const models_1 = require("../../models");
const getMe = async (req, res) => {
    try {
        const currentUserId = req.user.userId || req.user.id;
        if (!currentUserId) {
            return res.status(401).json({ message: "Токен дотор хэрэглэгчийн мэдээлэл алга" });
        }
        const user = await models_1.UserModel.findById(currentUserId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("GetMe Error:", error.message);
        res.status(500).json({ message: "Серверийн алдаа гарлаа" });
    }
};
exports.getMe = getMe;
