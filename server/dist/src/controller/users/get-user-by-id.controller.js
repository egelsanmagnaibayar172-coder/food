"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdAndGet = void 0;
const user_schema_1 = require("../../schema/user.schema");
const getUserByIdAndGet = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId || userId === "null" || userId === "undefined") {
            return res.status(400).json({ message: "User ID буруу байна" });
        }
        const user = await user_schema_1.UserModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User olsongui" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.getUserByIdAndGet = getUserByIdAndGet;
