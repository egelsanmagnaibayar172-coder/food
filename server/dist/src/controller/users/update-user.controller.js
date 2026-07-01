"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const user_schema_1 = require("../../schema/user.schema");
const updateUser = async (req, res) => {
    try {
        const loggedInUserId = req.user.id || req.user.userId;
        if (!loggedInUserId) {
            return res.status(401).json({ message: "Нэвтрэх эрхгүй байна." });
        }
        const updateData = req.body;
        delete updateData.password;
        delete updateData._id;
        delete updateData.role;
        const updatedUser = await user_schema_1.UserModel.findByIdAndUpdate(loggedInUserId, updateData, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
        }
        res.status(200).json({
            message: "Амжилттай шинэчлэгдлээ",
            user: updatedUser
        });
    }
    catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Алдаа гарлаа", error: error.message });
    }
};
exports.updateUser = updateUser;
